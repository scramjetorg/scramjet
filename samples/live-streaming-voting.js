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
const ConsistentHash = require("ch");

let handler = dc.http.requestHandler();
http.createServer(handler).listen(8080);


class Vote {

    constructor(data) {

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

const hash = new ConsistentHash(cfg.number.servers, cfg.number.duplicates);
const hash2 = new ConsistentHash(cfg.contestant.servers, cfg.contestant.duplicates);

dc.init()
    .read(dc.http.readPostData(handler, "/api/vote"))
        .map(
            (data) => new Vote(data)
        )
        .filter(
            (vote) => vote !== Vote.invalid
        )
        .nagle()
        .group(
            (vote) => hash.getNodeList(vote.phoneNumber)
        )
        .reduce(
            (cache, vote) => cache.replace(vote),
            dc.hashCache((vote) => vote.phoneNumber)
        )

        .use((cache) => cache.diffStream())
            .map(
                (diff) => ({
                    contestant: diff.key,
                    add: diff.add.length,
                    remove: diff.remove.length
                })
            )
            .nagle()
            .group(
                (diff) =>  diff.contestant
            )
            .reduce(
                (cache, diff) => cache.modify(
                    (oldData, newData, key) => {
                        oldData = oldData || {
                            contestant: key,
                            votes: 0
                        };
                        oldData.votes += newData.add;
                        oldData.votes -= newData.remove;
                        return oldData;
                    }
                ),
                dc.hashCache((diff) =>  diff.contestant)
            )

            .use((cache) => cache.rawData())
                .expose(dc.http.exposeData(handler, "/api/voteResults"))
                .up()
                
            .use((cache) => cache.changeStream())
                .expose(dc.http.exposeWebsocket(handler, "/ws/voteResults"))
;
