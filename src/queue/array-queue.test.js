import expect from 'expect';

import Queue from './queue.js';

describe('ArrayQueue', () => {
    describe('constructor', () => {
        it('creates an instance of the Queue class', () => {
            const queue = new Queue();

            expect(queue).toBeA(Queue);
        });
    });

    describe('enqueue', () => {
        it('adds a value to the queue', () => {
            const queue = new Queue();

            queue.enqueue(1);

            expect(queue.size).toBe(1);
        });
    });

    describe('dequeue', () => {
        it('removes the first value from the queue', () => {
            const queue = new Queue();

            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            queue.dequeue();

            expect(queue.size).toBe(2);
        });

        it('returns the removed value', () => {
            const queue = new Queue();

            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            const value = queue.dequeue();

            expect(value).toBe(1);
        });

        it('returns `undefined` if the queue is empty', () => {
            const queue = new Queue();

            const value = queue.dequeue();

            expect(value).toBe(undefined);
        });
    });

    describe('peek', () => {
        it('returns the next value in the queue', () => {
            const queue = new Queue();

            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            const value = queue.peek();

            expect(value).toBe(1);
        });

        it('returns `undefined` if the queue is empty', () => {
            const queue = new Queue();

            const value = queue.peek();

            expect(value).toBe(undefined);
        });
    });

    describe('toString', () => {
        it('returns a string representation of the queue', () => {
            const queue = new Queue();

            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);

            expect(queue.toString()).toBe('1,2,3');
        });
    });
});