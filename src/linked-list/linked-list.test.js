import expect from 'expect';

import SinglyLinkedList from './singly-linked-list.js';
import DoublyLinkedList from './doubly-linked-list.js';

test('SinglyLinkedList', SinglyLinkedList);
test('DoublyLinkedList', DoublyLinkedList);

function test(description, LinkedList) {
    describe(description, () => {
        describe('addFirst', () => {
            it('adds a value to the beginning', () => {
                const list = new LinkedList();

                list.addFirst(3);
                list.addFirst(2);
                list.addFirst(1);

                expect(list.size).toBe(3);
                expect(list.first).toBe(1);
            });
        });

        describe('addLast', () => {
            it('adds a value to the end', () => {
                const list = new LinkedList();

                list.addLast(1);
                list.addLast(2);
                list.addLast(3);

                expect(list.size).toBe(3);
                expect(list.last).toBe(3);
            });
        });

        describe('addBefore', () => {
            it('adds a value before another value', () => {
                const list = new LinkedList();

                list.addLast(2);
                list.addLast(3);
                list.addBefore(2, 1);

                expect(list.size).toBe(3);
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
                const list = new LinkedList();

                list.addLast(1);
                list.addBefore(2, 1);

                expect(list.size).toBe(1);
            });
        });

        describe('addAfter', () => {
            it('adds a value after another value', () => {
                const list = new LinkedList();

                list.addLast(1);
                list.addLast(3);
                list.addAfter(1, 2);

                expect(list.size).toBe(3);
                expect(list.last).toBe(3);
            });

            it('adds a value after another value if the list has only one item', () => {
                const list = new LinkedList();

                list.addLast(1);
                list.addAfter(1, 2);

                expect(list.size).toBe(2);
                expect(list.last).toBe(2);
            });

            it('does not add a value if the list is empty', () => {
                const list = new LinkedList();

                list.addAfter(1, 2);

                expect(list.size).toBe(0);
            });

            it('does not add a value if another value is not found', () => {
                const list = new LinkedList();

                list.addLast(1);
                list.addBefore(2, 3);

                expect(list.size).toBe(1);
            });
        });

        describe('add', () => {
            it('adds a value to the end', () => {
                const list = new LinkedList();

                list.add(1);
                list.add(2);
                list.add(3);

                expect(list.size).toBe(3);
                expect(list.last).toBe(3);
            });

            it('adds multiple values to the end', () => {
                const list = new LinkedList();

                list.add(1, 2, 3);

                expect(list.size).toBe(3);
                expect(list.last).toBe(3);
            });
        });

        describe('has', () => {
            it('returns `true` if the value is present', () => {
                const list = new LinkedList();

                list.add(1, 2, 3);

                expect(list.has(2)).toBe(true);
            });

            it('returns `false` if the value is not present', () => {
                const list = new LinkedList();

                list.add(1, 2, 3);

                expect(list.has(4)).toBe(false);
            });
        });

        describe('removeFirst', () => {
            it('removes the first value', () => {
                const list = new LinkedList();

                list.add(1, 2, 3);
                list.removeFirst();

                expect(list.size).toBe(2);
                expect(list.first).toBe(2);
            });

            it('does not remove a value if the list is empty', () => {
                const list = new LinkedList();

                list.removeFirst();

                expect(list.size).toBe(0);
            });
        });

        describe('removeLast', () => {
            it('removes the last value', () => {
                const list = new LinkedList();

                list.add(1, 2, 3);
                list.removeLast();

                expect(list.size).toBe(2);
                expect(list.last).toBe(2);
            });

            it('does not remove a value if the list is empty', () => {
                const list = new LinkedList();

                list.removeLast();

                expect(list.size).toBe(0);
            });
        });

        describe('remove', () => {
            it('removes a value', () => {
                const list = new LinkedList();

                list.add(1, 2, 3);
                list.remove(2);

                expect(list.size).toBe(2);
            });

            it('removes a value if it is the first value', () => {
                const list = new LinkedList();

                list.add(1, 2);
                list.remove(1);

                expect(list.size).toBe(1);
            });

            it('removes a value if it is the last value', () => {
                const list = new LinkedList();

                list.add(1, 2);
                list.remove(2);

                expect(list.size).toBe(1);
            });

            it('removes a value if it is the only value', () => {
                const list = new LinkedList();

                list.add(1);
                list.remove(1);

                expect(list.size).toBe(0);
            });
        });

        describe('clear', () => {
            it('returns the list to the initial state', () => {
                const list = new LinkedList();

                list.add(1, 2, 3, 4);

                expect(list.size).toBe(4);

                list.clear();

                expect(list.size).toBe(0);
            });
        });

        describe('toString', () => {
            it('returns a string representation of the list', () => {
                const list = new LinkedList();

                list.add(1, 2, 3);

                expect(list.toString()).toBe('1,2,3');
            });
        });

        describe('iterator', () => {
            it('implements the iterator protocol', () => {
                const list = new LinkedList();

                list.add(1, 2, 3);

                const array = Array.from(list);

                expect(array).toMatch([1, 2, 3]);
            });
        });
    });
}