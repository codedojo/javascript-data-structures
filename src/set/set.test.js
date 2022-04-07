import expect from 'expect';

import Set from './set.js';

describe('Set', () => {
    describe('constructor', () => {
        it('creates an instance of the Set class', () => {
            const set = new Set();

            expect(set).toBeAn(Set);
        });

        it('creates a set with initial values', () => {
            const set = new Set(1, 2, 3);

            expect(set.size).toBe(3);
        });

        it('creates a set with initial values without duplicates', () => {
            const set = new Set(1, 2, 3, 2, 3);

            expect(set.size).toBe(3);
        });
    });

    describe('add', () => {
        it('adds a value', () => {
            const set = new Set();

            set.add(1);

            expect(set.size).toBe(1);
        });

        it('adds multiple values', () => {
            const set = new Set();

            set.add(1, 2, 3);

            expect(set.size).toBe(3);
        });

        it('adds multiple values without duplicates', () => {
            const set = new Set();

            set.add(1, 2, 3, 2, 3);

            expect(set.size).toBe(3);
        });
    });

    describe('has', () => {
        it('returns `true` if the value is present', () => {
            const set = new Set(1);

            expect(set.has(1)).toBe(true);
        });

        it('returns `false` if the value is not present', () => {
            const set = new Set();

            expect(set.has(1)).toBe(false);
        });
    });

    describe('remove', () => {
        it('removes a value', () => {
            const set = new Set(1, 2, 3);

            set.remove(1);

            expect(set.size).toBe(2);
            expect(set.has(1)).toBe(false);
        });
    });

    describe('clear', () => {
        it('returns the set to the initial state', () => {
            const set = new Set(1, 2, 3);

            set.clear();

            expect(set.size).toBe(0);
        });
    });

    describe('union', () => {
        it('returns a set consisting of the elements of two sets', () => {
            const set1 = new Set(1, 2, 3);
            const set2 = new Set(3, 4, 5);
            const set3 = set1.union(set2);

            expect(set3.size).toBe(5);
            expect(set3.values).toMatch([1, 2, 3, 4, 5]);
        });
    });

    describe('intersection', () => {
        it('returns a set consisting of the elements that are present in both sets', () => {
            const set1 = new Set(1, 2, 3, 4);
            const set2 = new Set(3, 4, 5);
            const set3 = set1.intersection(set2);

            expect(set3.size).toBe(2);
            expect(set3.values).toMatch([3, 4]);
        });
    });

    describe('difference', () => {
        it('returns a set consisting of the elements that are not present in the 2nd set', () => {
            const set1 = new Set(1, 2, 3);
            const set2 = new Set(3, 4, 5);
            const set3 = set1.difference(set2);

            expect(set3.size).toBe(2);
            expect(set3.values).toMatch([4, 5]);
        });
    });

    describe('symmetricDifference', () => {
        it('returns a set consisting of the elements that are not present in both sets', () => {
            const set1 = new Set(1, 2, 3);
            const set2 = new Set(3, 4, 5);
            const set3 = set1.symmetricDifference(set2);

            expect(set3.size).toBe(4);
            expect(set3.values).toMatch([1, 2, 4, 5]);
        });
    });

    describe('toString', () => {
        it('returns a string representation', () => {
            const set = new Set(1, 2, 3, 4);

            expect(set.toString()).toBe('{1,2,3,4}');
        });
    });
});