import expect from 'expect';

import DoublyLinkedList from './doubly-linked-list.js';

describe('Doubly Linked List', () => {
    describe('constructor', () => {
        it('creates a instance of the DoublyLinkedList class', () => {
            const list = new DoublyLinkedList();

            expect(list).toBeA(DoublyLinkedList);
        });

        it('creates a linked list with initial values', () => {
            const list = new DoublyLinkedList(1, 2, 3);

            expect(list.length).toBe(3);
        });
    });

    describe('append', () => {
        it('adds a value to the end of the list', () => {
            const list = new DoublyLinkedList(1);

            list.append(2);

            expect(list.last).toBe(2);
        });
    });

    describe('prepend', () => {
        it('adds a value to the beginning of the list', () => {
            const list = new DoublyLinkedList(1);

            list.prepend(0);

            expect(list.first).toBe(0);
        });
    });

    describe('insert', () => {
        it('inserts a value after a specified value', () => {
            const list = new DoublyLinkedList(1, 3);

            list.insert(2, 1);

            expect(list.length).toBe(3);
            expect(list.first).toBe(1);
            expect(list.last).toBe(3);
        });
    });

    describe('remove', () => {
        it('removes a value from the list', () => {
            const list = new DoublyLinkedList(1, 2, 3);

            list.remove(2);

            expect(list.length).toBe(2);
        });
    });

    describe('has', () => {
        it('returns `true` if the value is present in the list', () => {
            const list = new DoublyLinkedList(1, 2, 3);

            expect(list.has(2)).toBe(true);
        });

        it('returns `false` if the value is not present in the list', () => {
            const list = new DoublyLinkedList(1, 2, 3);

            expect(list.has(4)).toBe(false);
        });
    });

    describe('toString', () => {
        it('returns a string representation of the list', () => {
            const list = new DoublyLinkedList(1, 2, 3);

            expect(list.toString()).toBe('1,2,3');
        });
    });
});