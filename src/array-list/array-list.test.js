import expect from 'expect';

import ArrayList from './array-list.js';

describe('ArrayList', () => {
    describe('constructor', () => {
        it('creates an instance of the ArrayList class', () => {
            const list = new ArrayList();

            expect(list).toBeAn(ArrayList);
        });

        it('creates a list with an initial length', () => {
            const list = new ArrayList(4);

            expect(list.capacity).toBe(4);
            expect(list.size).toBe(4);
        });

        it('creates a list with initial values', () => {
            const list = new ArrayList([1, 2, 3]);

            expect(list.capacity).toBe(3);
            expect(list.size).toBe(3);
        });
    });

    describe('get', () => {
        it('returns a value at the index', () => {
            const list = new ArrayList([1, 2, 3]);

            expect(list.get(1)).toBe(2);
        });

        it('given a negative index, returns a value at the index from the end of the list', () => {
            const list = new ArrayList([1, 2, 3]);

            expect(list.get(-1)).toBe(3);
        });

        it('returns `undefined` if the index is out of range', () => {
            const list = new ArrayList([1, 2, 3]);

            expect(list.get(42)).toBe(undefined);
        });
    });

    describe('set', () => {
        it('sets a value at the specific index', () => {
            const list = new ArrayList(4);

            list.set(0, 1);
            list.set(1, 2);
            list.set(2, 3);
            list.set(3, 4);

            expect(list.get(0)).toBe(1);
            expect(list.get(1)).toBe(2);
            expect(list.get(2)).toBe(3);
            expect(list.get(3)).toBe(4);
        });

        it('throws an error if the index is out of range', () => {
            const list = new ArrayList(4);

            expect(function() {
                list.set(4, 5);
            }).toThrow(/The index is out of range/);
        });
    });

    describe('add', () => {
        it('adds a value into the list', () => {
            const list = new ArrayList();

            list.add(1);

            expect(list.size).toBe(1);
            expect(list.get(0)).toBe(1);
        });

        it('adds a value into the list at the specified index', () => {
            const list = new ArrayList();

            list.add(1);
            list.add(3);
            list.add(4);
            list.add(2, 1);

            expect(list.size).toBe(4);
            expect(list.get(1)).toBe(2);
        });
    });

    describe('remove', () => {
        it('removes a value from the list at the specified index', () => {
            const list = new ArrayList([1, 2, 3, 4]);

            list.remove(1);

            expect(list.size).toBe(3);
        });
    });

    describe('indexOf', () => {
        it('returns the index of the value if it is present', () => {
            const list = new ArrayList([1, 2, 3, 4]);

            const index = list.indexOf(2);

            expect(index).toBe(1);
        });

        it('returns -1 if the value is not present', () => {
            const list = new ArrayList();

            const index = list.indexOf(2);

            expect(index).toBe(-1);
        });
    });

    describe('has', () => {
        it('returns `true` if the value is present', () => {
            const list = new ArrayList([1, 2, 3, 4]);

            expect(list.has(2)).toBe(true);
        });

        it('returns `false` if the value is not present', () => {
            const list = new ArrayList([1, 2, 3, 4]);

            expect(list.has(5)).toBe(false);
        });
    });

    describe('toString', () => {
        it('returns a string representation of the list', () => {
            const list = new ArrayList([1, 2, 3, 4]);

            expect(list.toString()).toBe('1,2,3,4');
        });
    });
});