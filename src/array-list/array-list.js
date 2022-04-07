export default class ArrayList {
    #items = [];
    #capacity = 0;
    #size = 0;

    constructor(arg) {
        if (typeof arg === 'number') {
            this.#items = new Array(arg);
            this.#capacity = arg;
            this.#size = 0;
        } else if (Array.isArray(arg)) {
            for (let i = 0; i < arg.length; i++) {
                this.#items[i] = arg[i];
                this.#capacity += 1;
                this.#size += 1;
            }
        }
    }

    get capacity() {
        return this.#capacity;
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
        if (index < 0 || index >= this.#capacity) {
            throw new Error('The index is out of range');
        }

        this.#items[index] = value;
    }

    add(value) {
        return this.addAt(this.#size, value);
    }

    addAt(index, value) {
        if (index < 0 || index > this.#capacity) {
            throw new Error('The index is out of range');
        }

        if (this.#size === this.#capacity) {
            const capacity = this.#size === 0 ? 4 : this.#size * 2;
            const items = new Array(capacity);

            if (this.#size > 0) {
                for (let i = 0; i < this.#items.length; i++) {
                    items[i] = this.#items[i];
                }
            }

            this.#items = items;
            this.#capacity = capacity;
        }

        for (let i = this.#size; i > index; i--) {
            this.#items[i] = this.#items[i - 1];
        }

        this.#items[index] = value;

        this.#size += 1;
    }

    remove(value) {
        const index = this.indexOf(value);

        if (index === -1) return;

        return this.removeAt(index);
    }

    removeAt(index) {
        if (index < 0 || index >= this.#capacity) {
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

    clear() {
        this.#items = [];
        this.#capacity = 0;
        this.#size = 0;
    }

    toString(separator = ',') {
        let result = '[';

        for (let i = 0; i < this.#size; i++) {
            const value = this.#items[i];

            result += value || '<empty>';

            if (i < this.#size - 1) {
                result += separator;
            }
        }

        result += ']';

        return result;
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this.#size; i++) {
            yield this.#items[i];
        }
    }
}