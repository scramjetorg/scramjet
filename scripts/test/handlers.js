module.exports = {
    unhandledRejectionHandler: (reason, p) => {
        console.error("Unacceptable unhandled rejection:", p);
        if (reason.stream) {
            console.error("Ocurred at stream constructed:", reason.stream._options.constructed);
            console.error("Stream transforms:", reason.stream._options.transforms + "");
            console.error("Chunk that caused the issue:", reason.chunk);
        }
        if (module.exports.unhandledRejectionHandler.lastAction) {
            console.error("Last notified action was:", module.exports.unhandledRejectionHandler.lastAction);
        }
        process.exit(101);
    }
};
