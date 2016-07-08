
# Interface Stream

    interface Stream {

        Stream transform(Callback<Buffer> transformation);
        DataStream split(Callback<Entry> splitter);

        Stream carry(Callbac<Accumulator, Stream>);

    }
