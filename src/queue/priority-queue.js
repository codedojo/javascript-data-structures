import DoublyLinkedList from '../linked-list/doubly-linked-list.js';

class QueueItem {
    constructor(value, priority = 0) {
        this.value = value;
        this.priority = priority;
    }

    toString() {
        return this.value;
    }
}

export default class PriorityQueue {
    #items = new DoublyLinkedList();

    get size() {
        return this.#items.size;
    }

    get empty() {
        return this.#items.empty;
    }

    get first() {
        return this.#items.first?.value;
    }

    get last() {
        return this.#items.last?.value;
    }

    enqueue(value, priority) {
        const newItem = new QueueItem(value, priority);

        if (this.empty) {
            this.#items.addLast(newItem);
            return;
        }

        let added = false;

        for (const item of this.#items) {
            if (newItem.priority > item.priority) {
                this.#items.addBefore(item, newItem);
                added = true;
                break;
            }
        }

        if (!added) {
            this.#items.addLast(newItem);
        }
    }

    dequeue() {
        if (this.empty) return;

        const value = this.first;

        this.#items.removeFirst();

        return value;
    }

    peek() {
        return this.first;
    }

    clear() {
        this.#items.clear();
    }

    toString() {
        return this.#items.toString();
    }

    *[Symbol.iterator]() {
        yield this.#items[Symbol.iterator]();
    }
}