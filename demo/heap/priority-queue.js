import Heap from './heap.js';

export default class PriorityQueue {
    #heap = new Heap();

    enqueue(value) {
        this.#heap.push(value);
    }

    dequeue() {
        const value = this.#heap.top;

        this.#heap.pop();

        return value;
    }
}