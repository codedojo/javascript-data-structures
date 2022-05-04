export default class ArrayList {
    #values = [];
    #size = 0;

    get #capacity() {
        return this.#values.length;
    }

    get size() {
        return this.#size;
    }

    get empty() {
        return this.#size === 0;
    }

    constructor(arg) {
        if (typeof arg === 'number') {
            this.#values = new Array(arg);
        } else if (Array.isArray(arg)) {
            this.#values = arg;
            this.#size = arg.length;
        }
    }

    get(index) {
        if (index < 0) {
            index = this.#size + index;
        }

        return this.#values[index];
    }

    set(index, value) {
        if (index < 0 || index >= this.#capacity) {
            throw new Error('The index is out of range');
        }

        this.#values[index] = value;
    }

    add(value) {
        this.addAt(this.#size, value);
    }

    addAt(index, value) {
        if (index < 0 || index > this.#capacity) {
            throw new Error('The index is out of range');
        }

        if (this.#size === this.#capacity) {
            this.#resize();
        }

        for (let i = this.#size; i > index; i--) {
            this.#values[i] = this.#values[i - 1];
        }

        this.#values[index] = value;

        this.#size++;
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

        delete this.#values[index];

        for (let i = index + 1; i < this.#size; i++) {
            this.#values[i - 1] = this.#values[i];
        }

        delete this.#values[this.#size - 1];

        this.#size--;
    }

    indexOf(value) {
        for (let i = 0; i < this.#size; i++) {
            if (this.#values[i] === value) {
                return i;
            }
        }

        return -1;
    }

    has(value) {
        return this.indexOf(value) > -1;
    }

    clear() {
        this.#values = [];
        this.#size = 0;
    }

    toString(separator = ',') {
        let result = '[';

        for (let i = 0; i < this.#size; i++) {
            const value = this.#values[i];

            result += value || '<empty>';

            if (i < this.#size - 1) {
                result += separator;
            }
        }

        result += ']';

        return result;
    }

    #resize() {
        const size = this.#size === 0 ? 4 : this.#size * 2;
        const values = new Array(size);

        for (let i = 0; i < this.#size; i++) {
            values[i] = this.#values[i];
        }

        this.#values = values;
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this.#size; i++) {
            yield this.#values[i];
        }
    }
}