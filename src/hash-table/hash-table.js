import HashTableItem from './hash-table-item.js';
import { djb2 } from './hashing.js';

export default class HashTable {
    static #INITIAL_CAPACITY = 137;
    static #FILL_FACTOR = 0.75;
    static #GROWTH_FACTOR = 2;

    #items = new Array(HashTable.#INITIAL_CAPACITY);
    #capacity = Math.floor(HashTable.#INITIAL_CAPACITY * HashTable.#FILL_FACTOR);
    #size = 0;

    get size() {
        return this.#size;
    }

    get keys() {
        const keys = [];

        for (const item of this.#items) {
            if (!item) continue;

            keys.push(...item.keys);
        }

        return keys;
    }

    get values() {
        const values = [];

        for (const item of this.#items) {
            if (!item) continue;

            values.push(...item.values);
        }

        return values;
    }

    get entries() {
        const entries = [];

        for (const item of this.#items) {
            if (!item) continue;

            entries.push(...item.entries);
        }

        return entries;
    }

    get(key) {
        return this.#items[this.#index(key)]?.get(key);
    }

    has(key) {
        return Boolean(this.#items[this.#index(key)]?.has(key));
    }

    put(key, value) {
        if (this.#size >= this.#capacity) {
            this.#resize();
        }

        const index = this.#index(key);

        if (this.#items[index] === undefined) {
            this.#items[index] = new HashTableItem(key, value);
            this.#size++;
        } else if (this.has(key)) {
            this.#items[index].update(key, value);
        } else {
            this.#items[index].add(key, value);
            this.#size++;
        }
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
            item?.clear();
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
        const capacity = this.#items.length * HashTable.#GROWTH_FACTOR;
        const items = new Array(capacity);

        for (const { key, value } of this.entries) {
            items[this.#index(key)] = new HashTableItem(key, value);
        }

        this.#capacity = Math.floor(capacity * HashTable.#FILL_FACTOR);
        this.#items = items;
    }

    *[Symbol.iterator]() {
        for (const entry of this.entries) {
            yield entry;
        }
    }
}