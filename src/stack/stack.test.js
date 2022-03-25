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
        it('pushes a value onto the stack', () => {
            const stack = new Stack();

            stack.push(1);

            expect(stack.size).toBe(1);
        });
    });

    describe('pop', () => {
        it('pops a value from the stack', () => {
            const stack = new Stack();

            stack.push(1);
            stack.push(2);
            stack.push(3);
            const value = stack.pop();

            expect(stack.size).toBe(2);
            expect(value).toBe(3);
        });

        it('returns `undefined` if the stack is empty', () => {
            const stack = new Stack();
            const value = stack.pop();

            expect(value).toBe(undefined);
        });
    });

    describe('peek', () => {
        it('returns the top value of the stack', () => {
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
            const stack = new Stack(1, 2, 3);

            stack.push(1);
            stack.push(2);
            stack.push(3);

            expect(stack.toString()).toBe('1,2,3');
        });
    });
});