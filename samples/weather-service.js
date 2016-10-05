const dc = require("dc");
const http = require("http");

let handler = dc.http.requestHandler();
http.createServer(handler).listen(8080);


class WeatherData extends dc.http.PostData {

    constructor(data) {
        super();
        this.iana = data.iana;
        this.windDirection = data.windDirection;
        this.windSpeed = data.windSpeed;
    }

    validate() {
        return (
            typeof this.windSpeed === "number" && this.windSpeed >= 0 && this.windSpeed < 150 &&
            typeof this.windDirection === "number" && this.windDirection >= 0 && this.windDirection < 360
        );
    }

}

dc.init()
    .readData(dc.http.readPostData("/updateWeather", WeatherData))
        .group((data) => data.iana)
        .tee(
            (stream) => stream.pipe(
                dc.database.mongo("mongodb://10.20.30.40:27017/weatherStore").write((data) => data.iana)
            )
        )
        .reduce(
            (acc, data) => {
                if (!(data.iana in acc)) {
                    acc[data.iana] = new dc.statistics.SampleList(100);
                    acc[data.iana].key = data.iana;
                }

                acc[data.iana].push(data);

                return acc;
            },
            dc.hashCache(dc.statistics.SampleList)
        ).use(
            (cache) => cache.changeStream()
        ).reduce(
            (acc, change) => {
                acc.put(change.key, change.newData);
            },
            dc.hashCache()
        ).use(dc.hashCache.values)
            .map(
                (sampleList) => ({
                    iana: sampleList.key,
                    latest: sampleList.raw.latest(),
                    distribution: dc.statistics.tools.Distribution(sampleList)
                })
            ).tee(
                (stream) => stream.map(
                        (sampleList) => sampleList.latest
                    ).join().reduce(
                        (acc, weather) => (acc[weather.iana] = weather, acc)
                    ).expose(
                        dc.http.exposeData("/weather/{iana}", (input, iana) => input[iana])
                    )
            ).reduce(
                (acc, weather) => (acc[weather.iana] = weather, acc)
            ).expose(
                dc.http.exposeData("/weather/{iana}", (input, iana) => input[iana])
            )
    ;
