import expect from 'expect';

import AVLTree from './avl.js';

describe('AVL Tree', () => {
    describe('add', () => {
        it('adds a value performing a left rotation', () => {
            const tree = new AVLTree();

            tree.add(1);
            tree.add(2);
            tree.add(3);

            //  1
            //   \
            //    2
            //     \
            //      3

            //   2
            //  / \
            // 1   3

            expect(tree.toString('pre')).toBe('2 1 3');
        });

        it('adds a value performing a right rotation', () => {
            const tree = new AVLTree();

            tree.add(3);
            tree.add(2);
            tree.add(1);

            //      3
            //     /
            //    2
            //   /
            //  1

            //   2
            //  / \
            // 1   3

            expect(tree.toString('pre')).toBe('2 1 3');
        });

        it('adds a value performing a left-right rotation', () => {
            const tree = new AVLTree();

            tree.add(1);
            tree.add(3);
            tree.add(2);

            //  1
            //   \
            //    3
            //   /
            //  2

            //   2
            //  / \
            // 1   3

            expect(tree.toString('pre')).toBe('2 1 3');
        });

        it('adds a value performing a right-left rotation', () => {
            const tree = new AVLTree();

            tree.add(3);
            tree.add(1);
            tree.add(2);

            //   3
            //  /
            // 1
            //  \
            //   2

            //   2
            //  / \
            // 1   3

            expect(tree.toString('pre')).toBe('2 1 3');
        });

        it('performs complex rotations', () => {
            const tree = new AVLTree();

            tree.Add(3);
            tree.Add(2);
            tree.Add(1);

            //  1
            //   \
            //    2
            //     \
            //      3

            //   2
            //  / \
            // 1   3

            expect(tree.toString('pre')).toBe('2 1 3');

            tree.add(4);

            //   2
            //  / \
            // 1   3
            //      \
            //       4

            expect(tree.toString('pre')).toBe('2 1 3 4');

            tree.Add(5);

            //   2
            //  / \
            // 1   3
            //      \
            //       4
            //        \
            //         5

            //   2
            //  / \
            // 1   4
            //    /  \
            //   3    5

            expect(tree.toString('pre')).toBe('2 1 4 3 5');

            tree.add(6);

            //   2
            //  / \
            // 1   4
            //    /  \
            //   3    5
            //         \
            //          6

            //     4
            //    / \
            //   2   5
            //  / \   \
            // 1   3   6

            expect(tree.toString('pre')).toBe('4 2 1 3 5 6');
        });

        it('adds and removes 1000 unique items', () => {
            const tree = new AVLTree();
            const items = [];

            // add random unique items to the tree
            while (items.length < 1000) {
                let next = Math.random();

                if (!items.includes(next)) {
                    items.push(next);
                    tree.add(next);
                }
            }

            expect(tree.size).toEqual(items.length, 'items and tree collection should have the same count');

            // make sure they all exist in the tree
            for (const value of items) {
                expect(tree.has(value)).toBe(true, 'The tree does not contain the expected value ' + value.ToString());
            }

            // remove the item from the tree and make sure it's gone
            for (const value of items) {
                expect(tree.remove(value)).toBe(false, "The tree does not contain the expected value " + value.ToString());
                expect(tree.has(value)).toBe(false, "The tree should not have contained the value " + value.ToString());
                expect(tree.remove(value)).toBe(false, "The tree should not have contained the value " + value.ToString());
            }

            // now make sure the tree is empty
            expect(tree.size).toBe(0, "The tree should be empty");
        });
    });

    describe('has', () => {
        it('returns `true` if the value is present', () => {
            const tree = new AVLTree();

            tree.add(3);
            tree.add(1);
            tree.add(4);
            tree.add(2);

            expect(tree.has(4)).toBe(true);
        });

        it('returns `false` if the value is not present', () => {
            const tree = new AVLTree();

            tree.add(3);
            tree.add(1);
            tree.add(4);
            tree.add(2);

            expect(tree.has(5)).toBe(false);
        });
    });

    describe('remove', () => {
        it('can not remove from empty', () => {
            const tree = new AVLTree();
            const removed = tree.remove(10);

            expect(removed).toBe(false);
        });

        it('removes head only', () => {
            const tree = new AVLTree();

            tree.add(4);
            const removed = tree.remove(4);

            expect(removed).toBe(true);
            expect(tree.size).toBe(0);
        });

        it('removes the head line right', () => {
            const tree = new AVLTree();

            tree.add(1);
            tree.add(2);
            tree.add(3);

            // 1
            //  \
            //   2
            //    \
            //     3

            tree.remove(1);

            // 2
            //  \
            //   3

            expect(tree.toString('post')).toBe('3 2');
        });

        it('removes the head line left', () => {
            const tree = new AVLTree();

            tree.add(3);
            tree.add(2);
            tree.add(1);

            //     3
            //    /
            //   2
            //  /
            // 1

            tree.remove(3);

            //   2
            //  /
            // 1

            expect(tree.toString('post')).toBe('1 2');
        });

        it('removes the head', () => {
            const tree = new AVLTree();

            tree.add(4);
            tree.add(5);
            tree.add(2);
            tree.add(7);
            tree.add(3);
            tree.add(6);
            tree.add(1);
            tree.add(8);

            //     4
            //   /   \
            //  2     6
            // / \   / \
            //1   3 5   7
            //           \
            //            8

            tree.remove(4);

            //     5
            //   /   \
            //  2     6
            // / \     \
            //1   3     7
            //           \
            //            8

            expect(tree.toString('post')).toBe('1 3 2 8 7 6 5');
        });

        it('removes a node without the left child', () => {
            const tree = new AVLTree();

            tree.add(4);
            tree.add(5);
            tree.add(2);
            tree.add(7);
            tree.add(3);
            tree.add(6);
            tree.add(1);
            tree.add(8);

            //        4
            //       / \
            //      2   5
            //     / \   \
            //    1   3   7
            //           / \
            //          6   8

            tree.remove(5);

            //         4
            //       /  \
            //      2     7
            //     / \   / \
            //    1   3  6  8

            expect(tree.toString('post')).toBe('1 3 2 6 8 7 4');
        });

        it('removes a right leaf node', () => {
            const tree = new AVLTree();

            tree.add(4);
            tree.add(5);
            tree.add(2);
            tree.add(7);
            tree.add(3);
            tree.add(6);
            tree.add(1);
            tree.add(8);

            //         4
            //       /   \
            //      2     6
            //     / \   / \
            //    1   3 5   7
            //               \
            //               8

            tree.remove(8);

            //         4
            //       /   \
            //      2     6
            //     / \   / \
            //    1   3 5   7

            expect(tree.toString('post')).toBe('1 3 2 5 7 6 4');
        });

        it('removes a left leaf node', () => {
            const tree = new AVLTree();

            tree.add(4);
            tree.add(5);
            tree.add(2);
            tree.add(7);
            tree.add(3);
            tree.add(6);
            tree.add(1);
            tree.add(8);

            //         4
            //       /   \
            //      2     6
            //     / \   / \
            //    1   3 5   7
            //               \
            //                8

            tree.remove(1);

            //        4
            //      /   \
            //    2      6
            //     \    / \
            //      3  5   7
            //              \
            //               8

            expect(tree.toString('post')).toBe('3 2 5 8 7 6 4');
        });

        it('removes current right that has no left', () => {
            const tree = new AVLTree();

            tree.add(4);
            tree.add(6);
            tree.add(5);
            tree.add(2);
            tree.add(7);
            tree.add(3);
            tree.add(1);
            tree.add(8);

            //       5 
            //     /   \
            //    3     7
            //   / \   / \
            //  2   4 6   8
            // /
            //1

            tree.remove(4);

            //     5 
            //   /   \
            //  2     7
            // / \   / \
            //1   3 6   8

            expect(tree.toString('post')).toBe('1 3 2 6 8 7 5');
        });

        it('removes current that has no right', () => {
            const tree = new AVLTree();

            tree.add(4);
            tree.add(2);
            tree.add(1);
            tree.add(3);
            tree.add(8);
            tree.add(6);
            tree.add(7);
            tree.add(5);

            //         4
            //       /   \
            //      2     8 
            //     / \    /
            //    1   3  6
            //          / \
            //         5   7 

            tree.remove(8);

            //         4
            //       /   \
            //      2      6 
            //     / \    / \
            //    1   3  5   7

            expect(tree.toString('post')).toBe('1 3 2 5 7 6 4');
        });

        it('removes current right has left', () => {
            const tree = new AVLTree();

            tree.add(4);
            tree.add(2);
            tree.add(1);
            tree.add(3);
            tree.add(6);
            tree.add(5);
            tree.add(8);
            tree.add(7);

            //         4
            //       /    \
            //      2      6 
            //     / \    / \
            //    1   3  5   8
            //              /
            //             7

            tree.remove(6);

            //         4
            //       /    \
            //      2      7 
            //     / \    / \
            //    1   3  5   8

            expect(tree.toString('post')).toBe('1 3 2 5 8 7 4');
        });

        it('can not remove a missing value', () => {
            const tree = new AVLTree();
            const values = [4, 2, 1, 3, 8, 6, 7, 5];

            for (const value of values) {
                expect(tree.has(10)).toBe(false, 'Tree should not contain 10');
                tree.add(value);
            }
        });
    });

    describe('forEachPreOrder', () => {
        it('traverses the tree pre-order', () => {
            const tree = new AVLTree();
            const list = [];

            for (let i = 0; i < 100; i++) {
                tree.add(i);
                list.push(i);
            }

            let index = 0;

            tree.forEachPreOrder(value => expect(list[index]).toEqual(value));
        });
    });

    describe('forEachInOrder', () => {
        it('traverses the tree in-order', () => {
            const tree = new AVLTree();

            tree.add(3);
            tree.add(1);
            tree.add(4);
            tree.add(2);

            //          3
            //      1     4
            //        2

            let string = '';

            tree.forEachInOrder(value => string += value + ' ');

            expect(string.trim()).toBe('1 2 3 4');
        });
    });

    describe('forEachPostOrder', () => {
        it('traverses the tree post-order', () => {
            const tree = new AVLTree();

            tree.add(3);
            tree.add(1);
            tree.add(4);
            tree.add(2);

            //          3
            //      1     4
            //        2

            let string = '';

            tree.forEachPostOrder(value => string += value + ' ');

            expect(string.trim()).toBe('1 2 4 3');
        });
    });

    describe('toString', () => {
        it('returns a string representation of the tree pre-order', () => {
            const tree = new AVLTree();

            tree.add(3);
            tree.add(1);
            tree.add(4);
            tree.add(2);

            expect(tree.toString('pre')).toBe('3 1 2 4');
        });

        it('returns a string representation of the tree in-order', () => {
            const tree = new AVLTree();

            tree.add(3);
            tree.add(1);
            tree.add(4);
            tree.add(2);

            expect(tree.toString('in')).toBe('1 2 3 4');
        });

        it('returns a string representation of the tree post-order', () => {
            const tree = new AVLTree();

            tree.add(3);
            tree.add(1);
            tree.add(4);
            tree.add(2);

            expect(tree.toString('post')).toBe('1 2 4 3');
        });
    });
});