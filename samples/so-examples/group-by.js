const {DataStream} = require("scramjet");

const exampleData = [
    { group: 1, id: 1 },
    { group: 1, id: 2 },
    { group: 2, id: 3 },
    { group: 2, id: 4 },
    { group: 3, id: 5 },
    { group: 4, id: 6 },
    { group: 5, id: 7 },
    { group: 5, id: 8 },
    { group: 6, id: 9 },
    { group: 6, id: 10 },
    { group: 7, id: 11 },
];

const groupBy = (stream) => {
    let currentGroup;
    let currentGroupEvents = [];

    return stream.pipe(new DataStream({
         promiseTransform(event) {
            if (!currentGroup) {
                currentGroup = event.group;
            }

            // If group changes, emit all collected events for old group
            if (currentGroup !== event.group) {
                const emitGroup = currentGroupEvents;
                currentGroupEvents = [];
                currentGroup = event.group;
                return emitGroup;
            }
            currentGroupEvents.push(event);
        },
        promiseFlush() {
            return [currentGroupEvents];
        }
    }));
};

DataStream
    .from(exampleData)
    .use(groupBy, 'you can pass more args here, those will be passed to groupBy')
    .toArray()
    .then((grouped) => {
        // Should have 7 groups, but it only has 6 since the LAST one is never emitted
        console.log(grouped.length);
    });
