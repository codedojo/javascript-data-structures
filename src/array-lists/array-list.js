export default class ArrayList {
    #length = 0;

    constructor(...args) {
        this.#length = args.length;

        for (let i = 0; i < args.length; i++) {
            this[i] = args[i];
        }
    }

    get length() {
        return this.#length;
    }

    insert(value, index = this.#length) {
        for (let i = this.#length; i > index; i--) {
            this[i] = this[i - 1];
        }

        this[index] = value;

        this.#length += 1;
    }

    remove(index) {
        delete this[index];

        for (let i = index + 1; i < this.#length; i++) {
            this[i - 1] = this[i];
        }

        delete this[this.#length - 1];

        this.#length -= 1;
    }

    indexOf(value) {
        for (let i = 0; i < this.#length; i++) {
            if (this[i] === value) {
                return i;
            }
        }

        return -1;
    }

    toString() {
        return Array.from(this).join();
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this.#length; i++) {
            yield this[i];
        }
    }
}