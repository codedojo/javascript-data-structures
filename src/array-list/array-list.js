export default class ArrayList {
    #items = [];
    #size = 0;

    constructor(arg) {
        if (typeof arg === 'number') {
            this.#items = new Array(arg);
            this.#size = arg;
        } else if (Array.isArray(arg)) {
            for (let i = 0; i < arg.length; i++) {
                this.#items[i] = arg[i];
            }

            this.#size = arg.length;
        }
    }

    get capacity() {
        return this.#items.length;
    }

    get size() {
        return this.#size;
    }

    get empty() {
        return this.#size === 0;
    }

    get(index) {
        if (index < 0) {
            index = this.#size + index;
        }

        return this.#items[index];
    }

    set(index, value) {
        if (index < 0 || index >= this.#size) {
            throw new Error('The index is out of range');
        }

        this.#items[index] = value;
    }

    insert(value, index = this.#size) {
        if (index < 0 || index > this.#size) {
            throw new Error('The index is out of range');
        }

        if (this.#size === this.#items.length) {
            const newLength = (this.#size === 0) ? 4 : this.#size * 2;
            const newArray = new Array(newLength);

            if (this.#size > 0) {
                for (let i = 0; i < this.#items.length; i++) {
                    newArray[i] = this.#items[i];
                }
            }

            this.#items = newArray;
        }

        for (let i = this.#size; i > index; i--) {
            this.#items[i] = this.#items[i - 1];
        }

        this.#items[index] = value;

        this.#size += 1;
    }

    remove(index) {
        if (index < 0 || index >= this.#size) {
            throw new Error('The index is out of range');
        }

        delete this.#items[index];

        for (let i = index + 1; i < this.#size; i++) {
            this.#items[i - 1] = this.#items[i];
        }

        delete this.#items[this.#size - 1];

        this.#size -= 1;
    }

    indexOf(value) {
        for (let i = 0; i < this.#size; i++) {
            if (this.#items[i] === value) {
                return i;
            }
        }

        return -1;
    }

    has(value) {
        return this.indexOf(value) > -1;
    }

    toString() {
        let result = '';

        for (let i = 0; i < this.#size; i++) {
            result += this.#items[i];

            if (i < this.#size - 1) {
                result += ',';
            }
        }

        return result;
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this.#size; i++) {
            yield this[i];
        }
    }
}