import LinkedList from '../linked-list/linked-list.js';

export default class HashTableItem {
    #items = new LinkedList();

    get keys() {
        const keys = [];

        for (const item of this.#items) {
            keys.push(item.key);
        }

        return keys;
    }

    get values() {
        return [...this.#items].map(item => item.value);
    }

    get entries() {
        return [...this.#items];
    }

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
}