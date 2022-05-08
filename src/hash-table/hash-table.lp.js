import { djb2 } from './hash.js';

const INITIAL_CAPACITY = 137;
const FILL_FACTOR = 0.75;
const GROWTH_FACTOR = 2;

export default class HashTable {
    #keys = new Array(INITIAL_CAPACITY);
    #values = new Array(INITIAL_CAPACITY);
    #capacity = Math.floor(INITIAL_CAPACITY * FILL_FACTOR);
    #size = 0;

    get size() {
        return this.#size;
    }

    get(key) {
        let index = this.#index(key);

        if (index === -1) return;

        while (this.#keys[index] !== undefined) {
            if (this.#keys[index] === key) {
                return this.#values[index];
            }

            index++;
        }
    }

    has(key) {
        return Boolean(this.get(key));
    }

    put(key, value) {
        if (this.#size >= this.#capacity) {
            this.#resize();
        }

        let index = this.#index(key);

        if (this.#keys[index] === key) {
            this.#values[index] = value;
            return;
        }

        if (this.#keys[index] === undefined) {
            this.#keys[index] = key;
            this.#values[index] = value;
        } else {
            while (this.#keys[index] !== undefined) {
                index++;
                index = index % this.#keys.length; // wrap if needed
            }

            this.#keys[index] = key;
            this.#values[index] = value;
        }

        this.#size++;
    }

    remove(key) {
        if (this.table[position] != null) {
            if (this.table[position].key === key) {
                delete this.table[position]; // {1}
                this.verifyRemoveSideEffect(key, position); // {2}
                return true;
            }
            let index = position + 1;
            while (this.table[index] != null && this.table[index].key !== key) {
                index++;
            }
            if (this.table[index] != null && this.table[index].key === key) {
                delete this.table[index]; // {3}
                this.verifyRemoveSideEffect(key, index); // {4}
                return true;
            }
        }
        return false;
    }

    // TODO: Implement proper probing algorithm for removing
    remove(key) {
        const index = this.#index(key);

        if (this.#keys[index] === key) {
            delete this.#keys[index];
            delete this.#values[index];
            this.size--;
            return true;
        }

        let currentIndex = index + 1;

        while (this.#keys[currentIndex] !== undefined) {
            if (this.#keys[currentIndex] === key) {
                delete this.#keys[currentIndex];
                delete this.#values[currentIndex];
                this.size--;
                return true;
            }

            currentIndex++;
            currentIndex = currentIndex % this.#keys.length; // wrap if needed
        }

        return false;
    }

    clear() {
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

        return hash % this.#keys.length;
    }

    #resize() {
        const oldKeys = this.#keys;
        const oldValues = this.#values;
        const newLength = oldKeys.length * GROWTH_FACTOR;

        this.#keys = new Array(newLength);
        this.#values = new Array(newLength);
        this.#capacity = Math.floor(newLength * FILL_FACTOR);

        for (let i = 0; i < oldKeys.length; i++) {
            if (!oldKeys[i]) continue;

            const key = oldKeys[i];
            const value = oldValues[i];
            let index = this.#index(key);

            if (this.#keys[index] === undefined) {
                this.#keys[index] = key;
                this.#values[index] = value;
            } else {
                while (this.#keys[index] !== undefined) {
                    index++;
                    index = index % this.#keys.length; // wrap if needed
                }

                this.#keys[index] = key;
                this.#values[index] = value;
            }

            this.#size++;
        }
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this.#keys.length; i++) {
            if (!this.#keys[i]) continue;

            const key = this.#keys[i];
            const value = this.#values[i];

            yield [key, value];
        }
    }
}