import DoublyLinkedList from '../linked-list/doubly-linked-list.js';

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

    push(value) {
        this.#items.addLast(value);
    }

    pop() {
        if (this.empty) return;

        const value = this.#items.last;

        this.#items.removeLast();

        return value;
    }

    peek() {
        return this.#items.last;
    }

    clear() {
        this.#items.clear();
    }

    toString() {
        return this.#items.toString();
    }

    *[Symbol.iterator]() {
        yield this.#items.iterator(-1);
    }
}