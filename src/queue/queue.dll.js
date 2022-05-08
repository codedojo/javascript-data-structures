import { DoublyLinkedList } from '../linked-list';

export default class Queue {
    #items = new DoublyLinkedList();

    get size() {
        return this.#items.size;
    }

    get empty() {
        return this.#items.empty;
    }

    get first() {
        return this.#items.first;
    }

    get last() {
        return this.#items.last;
    }

    enqueue(value) {
        this.#items.addLast(value);
    }

    dequeue() {
        if (this.empty) return;

        const value = this.#items.first;

        this.#items.removeFirst();

        return value;
    }

    peek() {
        return this.#items.first;
    }

    clear() {
        this.#items.clear();
    }

    toString() {
        return this.#items.toString();
    }

    *[Symbol.iterator]() {
        yield* this.#items[Symbol.iterator]();
    }
}