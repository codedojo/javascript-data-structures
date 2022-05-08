const DEFAULT_CAPACITY = 7;
const DEFAULT_COMPARE = (a, b) => a < b;

export default class Heap {
    #values = new Array(DEFAULT_CAPACITY);
    #size = 0;
    #compare;

    get #capacity() {
        return this.#values.length;
    }

    get size() {
        return this.#size;
    }

    get empty() {
        return this.#size === 0;
    }

    get top() {
        return this.#values[0];
    }

    constructor(compare = DEFAULT_COMPARE) {
        this.#compare = compare;
    }

    push(value) {
        if (this.#size === this.#capacity) {
            this.#resize();
        }

        this.#values[this.#size] = value;
        this.#bubbleUp(this.#size);
        this.#size++;
    }

    pop() {
        if (this.empty) return;

        const removedValue = this.#values[0];

        this.#values[0] = this.#values[this.#size - 1];
        this.#size--;

        this.#bubbleDown(0);

        return removedValue;
    }

    clear() {
        this.#values = [];
        this.#size = 0;
    }

    toString(separator = ',') {
        let result = '';

        for (const value of this) {
            result += value + separator;
        }

        return result.slice(0, result.length - separator.length);
    }

    #resize() {
        const length = this.#capacity * 2 + 1;
        const values = new Array(length);

        for (let i = 0; i < this.size; i++) {
            values[i] = this.#values[i];
        }

        this.#values = values;
    }

    #bubbleUp(index) {
        let parentIndex = this.#parentIndex(index);

        while (
            index > 0 &&
            this.#compare(this.#values[index], this.#values[parentIndex])
        ) {
            this.#swap(parentIndex, index);
            index = parentIndex;
            parentIndex = this.#parentIndex(index);
        }
    }

    #bubbleDown(parentIndex) {
        const parent = this.#values[parentIndex];
        const leftIndex = this.#leftIndex(parentIndex);
        const rightIndex = this.#rightIndex(parentIndex);
        const leftChild = this.#values[leftIndex];
        const rightChild = this.#values[rightIndex];

        // Case 1: No child
        if (leftIndex >= this.#size) return;

        // Case 2: Only-left
        if (rightIndex >= this.#size) {
            // if the parent is less than it's left child
            if (this.#compare(leftChild, parent)) {
                this.#swap(parentIndex, leftIndex);
                return this.#bubbleDown(leftIndex);
            }
        }

        // Case 3: Two children
        // if the left child is greater then the right child
        if (this.#compare(leftChild, rightChild)) {
            // compare and swap with the left child
            if (this.#compare(leftChild, parent)) {
                this.#swap(parentIndex, leftIndex);
                return this.#bubbleDown(leftIndex);
            }
        } else {
            // compare and swap with the right child
            if (this.#compare(rightChild, parent)) {
                this.#swap(parentIndex, rightIndex);
                return this.#bubbleDown(rightIndex);
            }
        }
    }

    #leftIndex(index) {
        return index * 2 + 1;
    }

    #rightIndex(index) {
        return index * 2 + 2;
    }

    #parentIndex(index) {
        if (index === 0) return undefined;

        return Math.floor((index - 1) / 2);
    }

    #swap(leftIndex, rightIndex) {
        const temp = this.#values[leftIndex];
        this.#values[leftIndex] = this.#values[rightIndex];
        this.#values[rightIndex] = temp;
    }

    *[Symbol.iterator]() {
        for (const value of this.#values) {
            if (value === undefined) return;

            yield value;
        }
    }
}