import expect from 'expect';

import ArrayList from './array-list.js';

describe('ArrayList', () => {
    describe('constructor', () => {
        it('creates an instance of the ArrayList class', () => {
            const list = new ArrayList();

            expect(list).toBeAn(ArrayList);
        });

        it('creates a list with initial values', () => {
            const list = new ArrayList(1, 2, 3);

            expect(list.length).toBe(3);
        });
    });

    describe('insert', () => {
        it('inserts a value into the list', () => {
            const list = new ArrayList();

            list.insert(1);

            expect(list.length).toBe(1);
        });

        it('inserts a value into the list at the specified index', () => {
            const list = new ArrayList(1, 2, 3);

            list.insert(0, 0);

            expect(list[0]).toBe(0);
        });
    });

    describe('remove', () => {
        it('removes a value from the list at the specified index', () => {
            const list = new ArrayList(1, 2, 3);

            list.remove(1);

            expect(list.length).toBe(2);
        });
    });

    describe('indexOf', () => {
        it('returns the index of the value if it is present', () => {
            const list = new ArrayList(1, 2, 3);
            const index = list.indexOf(2);

            expect(index).toBe(1);
        });

        it('returns -1 if the value is not present', () => {
            const list = new ArrayList();
            const index = list.indexOf(2);

            expect(index).toBe(-1);
        });
    });

    describe('toString', () => {
        it('returns a string representation of the list', () => {
            const list = new ArrayList(1, 2, 3);

            expect(list.toString()).toBe('1,2,3');
        });
    });
});