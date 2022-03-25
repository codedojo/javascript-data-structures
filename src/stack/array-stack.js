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

    push(value) {
        this.#items[this.#size] = value;
        this.#size += 1;
    }

    pop() {
        if (this.empty) return;

        const value = this.#items[this.size - 1];
        delete this.#items[this.#size - 1];
        this.#size -= 1;

        return value;
    }

    peek() {
        return this.#items[this.#size - 1];
    }

    clear() {
        this.#items = [];
        this.#size = 0;
    }

    toString() {
        return this.#items.join();
    }

    *[Symbol.iterator]() {
        yield this.#items[Symbol.iterator]();
    }
}