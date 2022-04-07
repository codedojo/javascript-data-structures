import expect from 'expect';

import HashTable from './hash-table.js';

describe('HashTable', () => {
    describe('constructor', () => {
        it('creates an instance of the HashTable class', () => {
            const hashTable = new HashTable();

            expect(hashTable).toBeA(HashTable);
        });
    });

    describe('put', () => {
        it('adds a value', () => {
            const hashTable = new HashTable();

            hashTable.put('a', 1);

            expect(hashTable.size).toBe(1);
        });

        it('updates a value if it is already present', () => {
            const hashTable = new HashTable();

            hashTable.put('a', 1);
            hashTable.put('a', 2);

            expect(hashTable.size).toBe(1);
        });
    });

    describe('get', () => {
        it('given a key returns a value', () => {
            const hashTable = new HashTable();

            hashTable.put('a', 1);
            const value = hashTable.get('a');

            expect(value).toBe(1);
        });

        it('returns `undefined` if the value is not present', () => {
            const hashTable = new HashTable();

            const value = hashTable.get('a');

            expect(value).toBe(undefined);
        });
    });

    describe('remove', () => {
        it('given a key removes a value', () => {
            const hashTable = new HashTable();

            hashTable.put('a', 1);
            hashTable.remove('a');

            expect(hashTable.size).toBe(0);
        });
    });

    describe('has', () => {
        it('given a key returns `true` if the value is present', () => {
            const hashTable = new HashTable();

            hashTable.put('a', 1);
            const hasValue = hashTable.has('a');

            expect(hasValue).toBe(true);
        });

        it('given a key returns `false` if the value is not present', () => {
            const hashTable = new HashTable();

            const hasValue = hashTable.has('b');

            expect(hasValue).toBe(false);
        });
    });

    describe('clear', () => {
        it('returns the hash table to the initial state', () => {
            const hashTable = new HashTable();

            hashTable.put('a', 1);
            hashTable.put('b', 2);
            hashTable.put('c', 3);

            expect(hashTable.size).toBe(3);

            hashTable.clear();

            expect(hashTable.size).toBe(0);
        });
    });
});