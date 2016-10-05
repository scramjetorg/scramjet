
interface DataHTTPServer {

    DataStream<RequestStructure> handle(String path)


}

interface RequestStructure {
    URL url
    HTTPRequest request
    HTTPResponse response
}
