module.exports = {
    unhandledRejectionHandler: (reason, p) => {
        console.log('Unacceptable unhandled rejection at:', p);
        if (reason.stream) {
            console.log('Ocurred at stream constructed:', reason.stream._options.constructed);
            console.log('Stream transforms:', reason.stream._options.transforms + '');
            console.log('Chunk that caused the issue:', reason.chunk);
        }
        process.exit(101);
    }
};
