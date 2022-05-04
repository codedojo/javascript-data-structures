export default class Stack {
    #items = [];
    #size = 0;

    get size() {
        return this.#size;
    }

    get empty() {
        return this.#size === 0;
    }

    get top() {
        return this.#items[this.#size - 1];
    }

    constructor(items = []) {
        this.#items = items;
    }

    push(item) {
        if (this.#size === this.#items.length) {
            this.#resize();
        }

        this.#items[this.#size] = item;
        this.#size++;
    }

    pop() {
        if (this.empty) return;

        const item = this.#items[this.size - 1];
        delete this.#items[this.#size - 1];
        this.#size--;

        return item;
    }

    peek() {
        return this.#items[this.#size - 1];
    }

    clear() {
        this.#items = [];
        this.#size = 0;
    }

    toString(separator = ' ') {
        let result = '';

        for (let i = this.#size - 1; i >= 0; i--) {
            result += this.#items[i];

            if (i > 0) {
                result += separator;
            }
        }

        return result;
    }

    #resize() {
        const capacity = this.empty ? 4 : this.#items.length * 2;
        const items = new Array(capacity);

        for (let i = 0; i < this.#size; i++) {
            items[i] = this.#items[i];
        }

        this.#items = items;
    }

    *[Symbol.iterator]() {
        for (let i = this.#size - 1; i >= 0; i--) {
            yield this.#items[i];
        }
    }
}