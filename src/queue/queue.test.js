import expect from 'expect';

import ArrayQueue from './queue.dll.js';
import DLLQueue from './queue.dll.js';

test('Queue implemented as an array', ArrayQueue);
test('Queue implemented as a doubly linked list', DLLQueue);

function test(description, Queue) {
    describe(description, () => {
        describe('enqueue', () => {
            it('adds a value', () => {
                const queue = new Queue();

                queue.enqueue(1);

                expect(queue.size).toBe(1);
            });
        });

        describe('dequeue', () => {
            it('removes and returns the first value', () => {
                const queue = new Queue();

                queue.enqueue(1);
                queue.enqueue(2);
                queue.enqueue(3);
                const value = queue.dequeue();

                expect(value).toBe(1);
                expect(queue.size).toBe(2);
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

        describe('clear', () => {
            it('returns the queue to the initial state', () => {
                const queue = new Queue();

                queue.enqueue(1);
                queue.enqueue(2);
                queue.enqueue(3);

                expect(queue.size).toBe(3);

                queue.clear();

                expect(queue.size).toBe(0);
            });
        });

        describe('toString', () => {
            it('returns a string representation', () => {
                const queue = new Queue();

                queue.enqueue(1);
                queue.enqueue(2);
                queue.enqueue(3);

                expect(queue.toString()).toBe('1,2,3');
            });
        });

        describe('iterator', () => {
            it('implements the iterator protocol', () => {
                const queue = new Queue();

                queue.enqueue(1);
                queue.enqueue(2);
                queue.enqueue(3);

                const array = Array.from(queue);

                expect(array).toMatch([1, 2, 3]);
            });
        });
    });
}