import expect from 'expect';

import Stack from './stack.js';

describe('Stack', () => {
    describe('constructor', () => {
        it('creates an instance of the Stack class', () => {
            const stack = new Stack();

            expect(stack).toBeA(Stack);
        });
    });

    describe('push', () => {
        it('adds a value to the stack', () => {
            const stack = new Stack();

            stack.push(1);

            expect(stack.size).toBe(1);
        });
    });

    describe('pop', () => {
        it('removes the last value from the stack', () => {
            const stack = new Stack();

            stack.push(1);
            stack.push(2);
            stack.push(3);
            stack.pop();

            expect(stack.size).toBe(2);
        });

        it('returns the removed value', () => {
            const stack = new Stack();

            stack.push(1);
            stack.push(2);
            stack.push(3);
            const value = stack.pop();

            expect(value).toBe(3);
        });

        it('returns `undefined` if the stack is empty', () => {
            const stack = new Stack();
            const value = stack.pop();

            expect(value).toBe(undefined);
        });
    });

    describe('peek', () => {
        it('returns the next value in the stack', () => {
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

    describe('toString', () => {
        it('returns a string representation of the stack', () => {
            const stack = new Stack();

            stack.push(1);
            stack.push(2);
            stack.push(3);

            expect(stack.toString()).toBe('1,2,3');
        });
    });
});