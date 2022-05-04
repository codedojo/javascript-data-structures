import expect from 'expect';

import StackArray from './stack.array.js';
import StackDLL from './stack.dll.js';

test('Stack implemented as an array', StackArray);
test('Stack implemented as a doubly linked list', StackDLL);

function test(description, Stack) {
    describe(description, () => {
        describe('push', () => {
            it('adds a value', () => {
                const stack = new Stack();

                stack.push(1);
                stack.push(2);
                stack.push(3);

                expect(stack.size).toBe(3);
            });
        });

        describe('pop', () => {
            it('removes and returns the last value', () => {
                const stack = new Stack();

                stack.push(1);
                stack.push(2);
                stack.push(3);

                const value = stack.pop();

                expect(value).toBe(3);
                expect(stack.size).toBe(2);
            });

            it('returns `undefined` if the stack is empty', () => {
                const stack = new Stack();

                const value = stack.pop();

                expect(value).toBe(undefined);
            });
        });

        describe('peek', () => {
            it('returns the next value', () => {
                const stack = new Stack();

                stack.push(1);
                stack.push(2);
                stack.push(3);

                const value = stack.peek();

                expect(value).toBe(3);
            });

            it('returns `undefined` if the stack is empty', () => {
                const stack = new Stack();

                const value = stack.peek();

                expect(value).toBe(undefined);
            });
        });

        describe('clear', () => {
            it('returns the stack to the initial state', () => {
                const stack = new Stack();

                stack.push(1);
                stack.push(2);
                stack.push(3);

                expect(stack.size).toBe(3);

                stack.clear();

                expect(stack.size).toBe(0);
            });
        });

        describe('toString', () => {
            it('returns a string representation', () => {
                const stack = new Stack();

                stack.push(1);
                stack.push(2);
                stack.push(3);

                expect(stack.toString()).toBe('3 2 1');
            });
        });

        describe('iterator', () => {
            it('implements the iterator protocol', () => {
                const stack = new Stack();

                stack.push(1);
                stack.push(2);
                stack.push(3);

                const array = Array.from(stack);

                expect(array).toMatch([3, 2, 1]);
            });
        });
    });
}