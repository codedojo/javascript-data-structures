import DoublyLinkedList from '../doubly-linked-list.js';

function defaultCompare(a, b) {
    if (a === b) return 0;
    return a > b ? 1 : -1;
}

export default class SortedList {
    #values = new DoublyLinkedList();

    constructor(compare = defaultCompare) {
        this.compare = compare;
    }

    get size() {
        return this.#values.size;
    }

    get empty() {
        return this.#values.empty;
    }

    get minValue() {
        return this.#values.first;
    }

    get maxValue() {
        return this.#values.last;
    }

    add(value) {
        if (this.empty) {
            this.#values.addLast(value);
        } else if (this.compare(value, this.maxValue) === 1) {
            this.#values.addLast(value);
        } else if (this.compare(value, this.minValue) === -1) {
            this.#values.addFirst(value);
        } else {
            for (const currentValue of this.#values) {
                if (
                    this.compare(currentValue, value) === 0 ||
                    this.compare(currentValue, value) === 1
                ) {
                    this.#values.addAfter(currentValue, value);
                    break;
                }
            }
        }
    }

    remove(value) {
        this.#values.remove(value);
    }

    has(value) {
        return this.#values.has(value);
    }

    toString() {
        return this.#values.toString();
    }
}

const list = new SortedList();

list.add(3);
list.add(2);
list.add(1);
list.add(3);
list.add(7);
list.add(0);

console.log(list.toString());