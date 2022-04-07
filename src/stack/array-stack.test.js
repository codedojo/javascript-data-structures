import expect from 'expect';

import Stack from './array-stack.js';

describe('ArrayStack', () => {
    describe('constructor', () => {
        it('creates an instance of the ArrayStack class', () => {
            const stack = new Stack();

            expect(stack).toBeAn(Stack);
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
    });

    describe('peek', () => {
        it('returns the top value of the stack', () => {
            const stack = new Stack();

            stack.push(1);
            stack.push(2);
            stack.push(3);

            const value = stack.peek();

            expect(stack.size).toBe(3);
            expect(value).toBe(3);
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