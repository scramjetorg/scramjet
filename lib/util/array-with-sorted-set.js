const SortedSet = require("js-sorted-set");

class ArrayWithSortedSet extends Array {
    constructor(params, ...args) {
        super(...args);
        this.sorted = new SortedSet(params);
    }

    getSorted() {
        return this.sorted;
    }

    push(...args) {
        args.forEach(
            (arg) => this.sorted.insert(arg)
        );
        return super.push(args);
    }

    unshift(...args) {
        args.forEach(
            (arg) => this.sorted.insert(arg)
        );
        return super.unshift(args);
    }

    shift(...args) {
        args.forEach(
            (arg) => this.sorted.remove(arg)
        );
        return super.shift(args);
    }

    pop(...args) {
        args.forEach(
            (arg) => this.sorted.remove(arg)
        );
        return super.pop(args);
    }

    splice(start, length, ...args) {
        const replaced = super.splice(start, length, ...args);

        replaced.forEach(
            (item) => this.sorted.remove(item)
        );
        args.forEach(
            (arg) => this.sorted.insert(arg)
        );

        return replaced;
    }


}
