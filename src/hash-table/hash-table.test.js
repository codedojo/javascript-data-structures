import expect from 'expect';

import HashTableSC from './hash-table.sc.js';
// import HashTableLP from './hash-table.lp.js';

test('HashTable using Separate Chaining', HashTableSC);
//test('HashTable using Linear Probing', HashTableOA);

function test(description, HashTable) {
    describe(description, () => {
        describe('put', () => {
            it('adds a value', () => {
                const hashTable = new HashTable();

                hashTable.put('a', 1);
                hashTable.put('b', 2);
                hashTable.put('c', 3);

                expect(hashTable.size).toBe(3);
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

            it('returns `undefined` if the hash table is empty', () => {
                const hashTable = new HashTable();

                const value = hashTable.get('a');

                expect(value).toBe(undefined);
            });

            it('returns `undefined` if the value is not present', () => {
                const hashTable = new HashTable();

                hashTable.put('a', 1);

                const value = hashTable.get('b');

                expect(value).toBe(undefined);
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

        describe('remove', () => {
            it('given a key removes a value', () => {
                const hashTable = new HashTable();

                hashTable.put('a', 1);
                hashTable.put('b', 2);
                hashTable.put('c', 3);

                const removed = hashTable.remove('a');

                expect(removed).toBe(true);
                expect(hashTable.size).toBe(2);
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

        describe('toString', () => {
            it('returns the string representation', () => {
                const hashTable = new HashTable();

                hashTable.put('a', 1);
                hashTable.put('b', 2);
                hashTable.put('c', 3);

                const string = hashTable.toString();

                expect(string).toMatch('{\n  a: 1\n  b: 2\n  c: 3\n}');
            });
        });

        describe('iterator', () => {
            it('returns the items', () => {
                const hashTable = new HashTable();

                hashTable.put('a', 1);
                hashTable.put('b', 2);
                hashTable.put('c', 3);

                const items = Array.from(hashTable);

                expect(items).toMatch([
                    { key: 'a', value: 1 },
                    { key: 'b', value: 2 },
                    { key: 'c', value: 3 }
                ]);
            });
        });
    });
}