import LinkedList from '../linked-list/linked-list.js';

export default class Set {
    #values = new LinkedList();

    constructor(...values) {
        for (const value of values) {
            this.add(value);
        }
    }

    get size() {
        return this.#values.size;
    }

    get empty() {
        return this.#values.empty;
    }

    get values() {
        return Array.from(this.#values);
    }

    add(...values) {
        for (const value of values) {
            if (this.has(value)) continue;

            this.#values.add(value);
        }
    }

    has(value) {
        return this.#values.has(value);
    }

    remove(value) {
        this.#values.remove(value);
    }

    clear() {
        this.#values.clear();
    }

    union(set) {
        const result = new Set();

        for (const value of this.values) {
            result.add(value);
        }

        for (const value of set.values) {
            result.add(value);
        }

        return result;
    }

    intersection(set) {
        const result = new Set();

        for (const value of set) {
            if (this.has(value)) {
                result.add(value);
            }
        }

        return result;
    }

    difference(set) {
        const result = new Set();

        for (const value of set) {
            if (!this.has(value)) {
                result.add(value);
            }
        }

        return result;
    }

    symmetricDifference(set) {
        const intersectionSet = this.intersection(set);
        const unionSet = this.union(set);

        return intersectionSet.difference(unionSet);
    }

    isSubsetOf(set) {
        if (this.size > set.size) return false;

        for (const value of set) {
            if (!this.has(value)) return false;
        }

        return true;
    }

    toString() {
        return `{${this.#values.toString()}}`;
    }

    *[Symbol.iterator]() {
        yield* this.#values[Symbol.iterator]();
    }
}