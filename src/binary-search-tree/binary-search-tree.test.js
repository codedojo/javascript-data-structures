import expect from 'expect';

import BinarySearchTree from './binary-search-tree.js';
import BinarySearchTreeItr from './binary-search-tree.itr.js';

test('BinarySearchTree implemented recursively', BinarySearchTree);
test('BinarySearchTree implemented iteratively', BinarySearchTreeItr);

function test(description, BinarySearchTree) {
    describe(description, () => {
        describe('add', () => {
            it('adds values according to the algorithm', () => {
                const tree = new BinarySearchTree();

                tree.add(3);
                tree.add(1);
                tree.add(4);
                tree.add(2);

                //          3
                //      1      4
                //        2

                expect(tree.toString('pre')).toBe('3 1 2 4');
            });
        });

        describe('has', () => {
            it('returns `true` if the value is present', () => {
                const tree = new BinarySearchTree();

                tree.add(3);
                tree.add(1);
                tree.add(4);
                tree.add(2);

                expect(tree.has(4)).toBe(true);
            });

            it('returns `false` if the value is not present', () => {
                const tree = new BinarySearchTree();

                tree.add(3);
                tree.add(1);
                tree.add(4);
                tree.add(2);

                expect(tree.has(5)).toBe(false);
            });
        });

        describe('remove', () => {
            it('removes the root only', () => {
                const tree = new BinarySearchTree();

                tree.add(3);
                tree.remove(3);

                expect(tree.toString('pre')).toBe('');
            });

            it('removes the root with one right child', () => {
                const tree = new BinarySearchTree();

                tree.add(1);
                tree.add(2);
                tree.add(3);

                // 1
                //   2
                //     3

                tree.remove(1);

                // 2
                //   3

                expect(tree.toString('pre')).toBe('2 3');
            });

            it('removes the root with one left child', () => {
                const tree = new BinarySearchTree();

                tree.add(3);
                tree.add(2);
                tree.add(1);

                //     3
                //   2
                // 1

                tree.remove(3);

                //   2
                // 1

                expect(tree.toString('pre')).toBe('2 1');
            });

            it('removes the root node with two children', () => {
                const tree = new BinarySearchTree();

                tree.add(10);
                tree.add(5);
                tree.add(4);
                tree.add(6);
                tree.add(20);
                tree.add(15);
                tree.add(12);
                tree.add(13);
                tree.add(14);

                //          10
                //      5        20
                //    4   6    15
                //           12
                //             13
                //               14

                tree.remove(10);

                //          12
                //      5        20
                //    4   6    15
                //           13
                //             14

                expect(tree.toString('pre')).toBe('12 5 4 6 20 15 13 14');

                tree.remove(12);

                //          13
                //      5        20
                //    4   6    15
                //           14

                expect(tree.toString('pre')).toBe('13 5 4 6 20 15 14');
            });

            it('removes leaf nodes', () => {
                const tree = new BinarySearchTree();

                tree.add(3);
                tree.add(1);
                tree.add(4);
                tree.add(2);

                //          3
                //      1     4
                //        2

                tree.remove(2);
                expect(tree.toString('pre')).toBe('3 1 4');

                tree.remove(4);
                expect(tree.toString('pre')).toBe('3 1');

                tree.remove(1);
                expect(tree.toString('pre')).toBe('3');
            });

            it('removes a node with no left child', () => {
                const tree = new BinarySearchTree();

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
                //      2   5 <--
                //     / \   \
                //    1   3   7
                //           / \
                //          6   8

                tree.remove(5);

                //        4
                //       /  \
                //      2    6
                //     / \    \
                //    1   3    7
                //              \
                //               8

                expect(tree.toString('pre')).toBe('4 2 1 3 6 7 8');
            });

            it('removes a right leaf node', () => {
                const tree = new BinarySearchTree();

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
                //          6   8 <--

                tree.remove(8);

                //        4
                //       / \
                //      2   5
                //     / \   \
                //    1   3   7
                //           /
                //          6

                expect(tree.toString('pre')).toBe('4 2 1 3 5 7 6');
            });

            it('removes a left leaf node', () => {
                const tree = new BinarySearchTree();

                tree.add(4);
                tree.add(5);
                tree.add(2);
                tree.add(7);
                tree.add(3);
                tree.add(6);
                tree.add(1);
                tree.add(8);

                //         4
                //        / \
                //       2   5
                //      / \   \
                // --> 1   3   7
                //            / \
                //           6   8

                tree.remove(1);

                //    4
                //   / \
                //  2   5
                //   \   \
                //    3   7
                //       / \
                //      6   8

                expect(tree.toString('pre')).toBe('4 2 3 5 7 6 8');
            });

            it('removes a node with a child with no left child', () => {
                const tree = new BinarySearchTree();

                tree.add(4);
                tree.add(6);
                tree.add(5);
                tree.add(2);
                tree.add(7);
                tree.add(3);
                tree.add(1);
                tree.add(8);

                //         4
                //       /   \
                //      2     6 <--
                //     / \    /\
                //    1   3  5  7
                //               \
                //                8

                tree.remove(6);

                //          4
                //       /    \
                //      2      7
                //     / \    / \
                //    1   3  5   8

                expect(tree.toString('pre')).toBe('4 2 1 3 7 5 8');
            });

            it('removes a node with a child with no right child', () => {
                const tree = new BinarySearchTree();

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
                //      2     8 <--
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

                expect(tree.toString('pre')).toBe('4 2 1 3 6 5 7');
            });

            it('removes a node with a child with a left child', () => {
                const tree = new BinarySearchTree();

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
                //      2      6 <--
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

                expect(tree.toString('pre')).toBe('4 2 1 3 7 5 8');
            });

            it('does not remove a node if the value is not present', () => {
                const tree = new BinarySearchTree();

                tree.add(3);
                tree.remove(4);

                expect(tree.toString('pre')).toBe('3');
            });

            it('does not remove a node if the tree is empty', () => {
                const tree = new BinarySearchTree();

                tree.remove(4);

                expect(tree.toString('pre')).toBe('4');
            });
        });

        describe('forEachPreOrder', () => {
            it('traverses the tree pre-order', () => {
                const tree = new BinarySearchTree();

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

                let string = '';

                tree.forEachPreOrder(value => string += value + ' ');

                expect(string.trim()).toBe('4 2 1 3 5 7 6 8');
            });
        });

        describe('forEachInOrder', () => {
            it('traverses the tree in-order', () => {
                const tree = new BinarySearchTree();

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

                let string = '';

                tree.forEachInOrder(value => string += value + ' ');

                expect(string.trim()).toBe('1 2 3 4 5 6 7 8');
            });
        });

        describe('forEachPostOrder', () => {
            it('traverses the tree post-order', () => {
                const tree = new BinarySearchTree();

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

                let string = '';

                tree.forEachPostOrder(value => string += value + ' ');

                expect(string.trim()).toBe('1 3 2 6 8 7 5 4');
            });
        });

        describe('toString', () => {
            it('returns a string representation of the tree pre-order', () => {
                const tree = new BinarySearchTree();

                tree.add(11);
                tree.add(7);
                tree.add(15);
                tree.add(5);
                tree.add(3);
                tree.add(6);
                tree.add(9);
                tree.add(8);
                tree.add(10);
                tree.add(13);
                tree.add(12);
                tree.add(14);
                tree.add(20);
                tree.add(18);
                tree.add(25);

                expect(tree.toString('pre')).toBe('11 7 5 3 6 9 8 10 15 13 12 14 20 18 25');
            });

            it('returns a string representation of the tree in-order', () => {
                const tree = new BinarySearchTree();

                tree.add(11);
                tree.add(7);
                tree.add(15);
                tree.add(5);
                tree.add(3);
                tree.add(6);
                tree.add(9);
                tree.add(8);
                tree.add(10);
                tree.add(13);
                tree.add(12);
                tree.add(14);
                tree.add(20);
                tree.add(18);
                tree.add(25);

                expect(tree.toString('in')).toBe('3 5 6 7 8 9 10 11 12 13 14 15 18 20 25');
            });

            it('returns a string representation of the tree post-order', () => {
                const tree = new BinarySearchTree();

                tree.add(11);
                tree.add(7);
                tree.add(15);
                tree.add(5);
                tree.add(3);
                tree.add(6);
                tree.add(9);
                tree.add(8);
                tree.add(10);
                tree.add(13);
                tree.add(12);
                tree.add(14);
                tree.add(20);
                tree.add(18);
                tree.add(25);

                expect(tree.toString('post')).toBe('3 6 5 8 10 9 7 12 14 13 18 25 20 15 11');
            });
        });
    });
}