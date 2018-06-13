/**
 * In a TV show people may vote on one of contestants.
 *
 * The server above allows to create a distributed and fault-tolerant service
 * with extreme ease.
 *
 * At the start the service exposes an url to post data to.
 * In the middle it does streamed calculations grouped by phone number and contestants.
 * At the end it exposes data over a websocket and http get urls.
 */

const dc = require("dc");
const http = require("http");

let handler = dc.http.requestHandler();
http.createServer(handler).listen(8080);

class Vote extends dc.http.PostData {

    constructor(data) {
        super();

        if (!data)
            return this;

        try {
            const voteData = data instanceof Object && data;
            if (voteData && voteData.contestant && voteData.phoneNumber && Object.keys(voteData).length === 2) {
                this.contestant = voteData.contestant;
                this.phoneNumber = voteData.phoneNumber;
                return this;
            }
        } finally {
            return Vote.invalid;
        }
    }

    serialize() {
        return JSON.stringify({
            contestant: this.contestant,
            phoneNumber: this.phoneNumber
        });
    }

    static deserialize(data) {
        return new Vote(data);
    }

}
Vote.invalid = new Vote();

dc.init()
    .readData(dc.http.readPostData(handler, "/api/vote"))
        .map(
            (data) => new Vote(data)
        )
        .filter(
            (vote) => vote !== Vote.invalid
        )
        .group(
            (vote) => vote.phoneNumber
        )
        .nagle()
        .reduce(
            (cache, votes) => votes.forEach((vote) => cache.replace(vote)),
            dc.hashCache((vote) => vote.phoneNumber)
        )

        .use((cache) => cache.changeStream())
            .nagle()
            .reduce(
                (emitter, changes) => {
                    const acc = {};
                    changes.forEach((change) => {
                        if (change.oldData) acc[change.oldData.contestant]--;
                        acc[change.newData.contestant]++;
                    });
                    emitter.emit(acc);
                }, dc.dataEmitter()
            )
            .reduce(
                (emitter, diff) => {
                    for (var id in diff) {
                        emitter.emit({
                            contestant: id,
                            votes: diff[id]
                        });
                    }
                },
                dc.dataEmitter()
            )
            .nagle()
            .group(
                (subtotal) =>  subtotal.contestant
            )
            .reduce(
                (cache, subtotals) => cache.modify(subtotal[0].contestant,
                    (oldData) => {

                        if (!oldData)
                            oldData = subtotal.shift();

                        oldData.votes += subtotal.votes;

                        return oldData;
                    }
                ),
                dc.hashCache((subtotal) =>  subtotal.contestant)
            )

            .use((cache) => cache.rawData())
                .expose(dc.http.exposeData(handler, "/api/voteResults"))
                .up()

            .use((cache) => cache.changeStream())
                .expose(dc.http.exposeWebsocket(handler, "/ws/voteResults"))
;
