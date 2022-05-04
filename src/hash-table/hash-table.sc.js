import LinkedList from '../linked-list/singly-linked-list.js';
import { djb2 } from './hash.js';

const INITIAL_CAPACITY = 137;
const FILL_FACTOR = 0.75;
const GROWTH_FACTOR = 2;

class HashTableItem {
    #items = new LinkedList();

    constructor(key, value) {
        this.add(key, value);
    }

    get(key) {
        for (const item of this.#items) {
            if (item.key === key) {
                return item.value;
            }
        }
    }

    has(key) {
        for (const item of this.#items) {
            if (item.key === key) {
                return true;
            }
        }

        return false;
    }

    add(key, value) {
        this.#items.addFirst({ key, value });
    }

    update(key, value) {
        for (const item of this.#items) {
            if (item.key === key) {
                item.value = value;
                return true;
            }
        }

        return false;
    }

    remove(key) {
        for (const item of this.#items) {
            if (item.key === key) {
                this.#items.remove(item);
                return true;
            }
        }

        return false;
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

export default class HashTable {
    #items = new Array(INITIAL_CAPACITY);
    #capacity = Math.floor(INITIAL_CAPACITY * FILL_FACTOR);
    #size = 0;

    get size() {
        return this.#size;
    }

    put(key, value) {
        if (this.#size >= this.#capacity) {
            this.#resize();
        }

        const index = this.#index(key);
        const item = this.#items[index];

        if (item === undefined) {
            this.#items[index] = new HashTableItem(key, value);
            this.#size++;
        } else if (item.has(key)) {
            item.update(key, value);
        } else {
            item.add(key, value);
            this.#size++;
        }
    }

    get(key) {
        return this.#items[this.#index(key)]?.get(key);
    }

    has(key) {
        return Boolean(this.#items[this.#index(key)]?.has(key));
    }

    remove(key) {
        const removed = this.#items[this.#index(key)].remove(key);

        if (removed) {
            this.#size--;
        }

        return removed;
    }

    clear() {
        for (const item of this.#items) {
            if (!item) continue;

            item.clear();
        }

        this.#size = 0;
    }

    toString() {
        let string = '{\n';

        for (const { key, value } of this) {
            string += `  ${key}: ${value}\n`;
        }

        string += '}';

        return string;
    }

    #index(key) {
        const hash = djb2(key);

        return hash % this.#items.length;
    }

    #resize() {
        const oldItems = this.#items;
        const newLength = oldItems.length * GROWTH_FACTOR;

        this.#items = new Array(newLength);
        this.#capacity = Math.floor(newLength * FILL_FACTOR);

        for (const item of this.oldItems) {
            if (!item) continue;

            const { key, value } = item;
            const index = this.#index(key);

            if (this.#items[index] === undefined) {
                this.#items[index] = new HashTableItem(key, value);
            } else {
                this.#items[index].add(key, value);
            }

            this.#size++;
        }
    }

    *[Symbol.iterator]() {
        for (const item of this.#items) {
            if (!item) continue;

            yield* item[Symbol.iterator]();
        }
    }
}