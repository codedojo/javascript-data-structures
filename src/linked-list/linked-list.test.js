import expect from 'expect';

import LinkedList from './linked-list.js';

describe('LinkedList', () => {
    describe('constructor', () => {
        it('creates a instance of the LinkedList class', () => {
            const list = new LinkedList();

            expect(list).toBeA(LinkedList);
        });

        it('creates a linked list with initial values', () => {
            const list = new LinkedList(1, 2, 3);

            expect(list.size).toBe(3);
        });
    });

    describe('addFirst', () => {
        it('adds a value to the beginning of the list', () => {
            const list = new LinkedList(1);

            list.addFirst(0);

            expect(list.first).toBe(0);
        });
    });

    describe('addLast', () => {
        it('adds a value to the end of the list', () => {
            const list = new LinkedList(1);

            list.addLast(2);

            expect(list.last).toBe(2);
        });
    });

    describe('addBefore', () => {
        it('adds a value before another value', () => {
            const list = new LinkedList();

            list.addFirst(2);
            list.addBefore(2, 1);

            expect(list.size).toBe(2);
            expect(list.first).toBe(1);
        });

        it('adds a value before another value if the list has only one item', () => {
            const list = new LinkedList();

            list.addLast(2);
            list.addLast(3);
            list.addBefore(2, 1);

            expect(list.size).toBe(3);
            expect(list.first).toBe(1);
        });

        it('does not add a value if the list is empty', () => {
            const list = new LinkedList();

            list.addBefore(2, 1);

            expect(list.size).toBe(0);
        });

        it('does not add a value if another value is not found', () => {
            const list = new LinkedList(1);

            list.addBefore(2, 1);

            expect(list.size).toBe(1);
        });
    });

    describe('addAfter', () => {
        it('adds a value after another value', () => {
            const list = new LinkedList();

            list.addLast('a');
            list.addLast('c');
            list.addAfter('a', 'c');

            expect(list.size).toBe(3);
        });

        it('adds a value after another value if the list has only one item', () => {
            const list = new LinkedList('a');

            list.addAfter('a', 'b');

            expect(list.size).toBe(2);
            expect(list.last).toBe('b');
        });

        it('does not add a value if the list is empty', () => {
            const list = new LinkedList();

            list.addAfter('a', 'b');

            expect(list.size).toBe(0);
        });

        it('does not add a value if another value is not found', () => {
            const list = new LinkedList('a');

            list.addBefore('b', 'c');

            expect(list.size).toBe(1);
        });
    });

    describe('removeFirst', () => {
        it('removes the first value in the list', () => {
            const list = new LinkedList('a', 'b', 'c');

            list.removeFirst();

            expect(list.size).toBe(2);
            expect(list.first).toBe('b');
        });

        it('does not remove a value if the list is empty', () => {
            const list = new LinkedList();

            list.removeFirst();

            expect(list.size).toBe(0);
        });
    });

    describe('removeLast', () => {
        it('removes the last value in the list', () => {
            const list = new LinkedList('a', 'b', 'c');

            list.removeLast();

            expect(list.size).toBe(2);
            expect(list.last).toBe('b');
        });

        it('does not remove a value if the list is empty', () => {
            const list = new LinkedList();

            list.removeLast();

            expect(list.size).toBe(0);
        });
    });

    describe('remove', () => {
        it('removes a value from the list', () => {
            const list = new LinkedList(1, 2, 3);

            list.remove(2);

            expect(list.size).toBe(2);
        });

        it('removes a value from the list if it is the first value', () => {
            const list = new LinkedList(1, 2);

            list.remove(1);

            expect(list.size).toBe(1);
        });

        it('removes a value from the list if it is the last value', () => {
            const list = new LinkedList(1, 2);

            list.remove(2);

            expect(list.size).toBe(1);
        });

        it('removes a value from the list if it is the only value', () => {
            const list = new LinkedList(1);

            list.remove(1);

            expect(list.size).toBe(0);
        });
    });

    describe('has', () => {
        it('returns `true` if the value is present in the list', () => {
            const list = new LinkedList(1, 2, 3);

            expect(list.has(2)).toBe(true);
        });

        it('returns `false` if the value is not present in the list', () => {
            const list = new LinkedList(1, 2, 3);

            expect(list.has(4)).toBe(false);
        });
    });

    describe('toString', () => {
        it('returns a string representation of the list', () => {
            const list = new LinkedList(1, 2, 3);

            expect(list.toString()).toBe('1,2,3');
        });
    });
});