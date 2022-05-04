import expect from 'expect';

import PriorityQueue from './priority-queue.js';

describe('PriorityQueue', () => {
    describe('constructor', () => {
        it('creates an instance of the Queue class', () => {
            const queue = new PriorityQueue();

            expect(queue).toBeA(PriorityQueue);
        });
    });

    describe('enqueue', () => {
        it('adds a value to the queue', () => {
            const queue = new PriorityQueue();

            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);

            expect(queue.size).toBe(3);
            expect(queue.first).toBe(1);
        });

        it('adds a value to the queue according to the priority', () => {
            const queue = new PriorityQueue();

            queue.enqueue(1);
            queue.enqueue(2, 1);
            queue.enqueue(3, 2);

            expect(queue.first).toBe(3);
        });
    });

    describe('dequeue', () => {
        it('removes the first value from the queue', () => {
            const queue = new PriorityQueue();

            queue.enqueue(1);
            queue.enqueue(2, 1);
            queue.enqueue(3, 2);

            queue.dequeue();

            expect(queue.size).toBe(2);
        });

        it('returns the removed value', () => {
            const queue = new PriorityQueue();

            queue.enqueue(1);
            queue.enqueue(2, 1);
            queue.enqueue(3, 2);
            const value = queue.dequeue();

            expect(value).toBe(3);
        });

        it('returns `undefined` if the queue is empty', () => {
            const queue = new PriorityQueue();

            const value = queue.dequeue();

            expect(value).toBe(undefined);
        });
    });

    describe('peek', () => {
        it('returns the next value in the queue', () => {
            const queue = new PriorityQueue();

            queue.enqueue(1);
            queue.enqueue(2, 1);
            queue.enqueue(3, 2);
            const value = queue.peek();

            expect(value).toBe(3);
        });

        it('returns `undefined` if the queue is empty', () => {
            const queue = new PriorityQueue();

            const value = queue.peek();

            expect(value).toBe(undefined);
        });
    });

    describe('toString', () => {
        it('returns a string representation of the queue', () => {
            const queue = new PriorityQueue();

            queue.enqueue(1);
            queue.enqueue(2, 1);
            queue.enqueue(3, 2);

            expect(queue.toString()).toBe('3,2,1');
        });
    });
});