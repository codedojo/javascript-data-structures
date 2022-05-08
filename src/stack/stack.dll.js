import { DoublyLinkedList } from '../linked-list';

export default class Stack {
    #items = new DoublyLinkedList();

    get size() {
        return this.#items.size;
    }

    get empty() {
        return this.#items.empty;
    }

    get top() {
        return this.#items.last;
    }

    get bottom() {
        return this.#items.first;
    }

    constructor(items = []) {
        for (const item of items) {
            this.push(item);
        }
    }

    push(item) {
        this.#items.addLast(item);
    }

    pop() {
        if (this.empty) return;

        const item = this.#items.last;

        this.#items.removeLast();

        return item;
    }

    peek() {
        return this.#items.last;
    }

    clear() {
        this.#items.clear();
    }

    toString(separator = ' ') {
        let result = '';

        for (const value of this) {
            result += value;

            if (value !== this.bottom) {
                result += separator;
            }
        }

        return result;
    }

    *[Symbol.iterator]() {
        yield* this.#items.iterator(-1);
    }
}