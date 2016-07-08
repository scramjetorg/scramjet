
# Interface DataStream

    interface DataStream extends Stream {

        Stream transform(Callback<DataStream> transform);

        DataStream<Entry> tee(Callback<DataStream<Entry>> teeOperation);
        DataStream<Entry[]> group(Callback<DataStream> groupFunction);
        DataStream<Entry[]> every(Callback<Entry> subflowFunction);

    }
