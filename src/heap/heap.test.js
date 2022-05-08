import expect from 'expect';

import Heap from './heap.js';
import { getRange, getRangeBetween, getRandomInts } from '../utils.js';

describe('Heap', () => {
    describe('creation', () => {
        it('is created', () => {
            const heap = new Heap();

            expect(heap).toBeA(Heap);
        });

        it('is created empty', () => {
            const heap = new Heap();

            expect(heap.size).toBe(0);
            expect(heap.empty).toBe(true);
        });
    });

    describe('adding values', () => {
        it('adds ordered values', () => {
            const heap = new Heap();
            const values = getRange(0, 10);

            for (const value of values) {
                heap.push(value);
            }

            expect(heap.size).toBe(values.length);
            expect(Array.from(heap)).toEqual(values);
            expect(heap.top).toBe(0);
        });

        it('adds ordered values in reverse order', () => {
            const heap = new Heap();
            const values = getRange(0, 10).reverse();
            const result = [0, 1, 4, 3, 2, 8, 5, 9, 6, 7];

            for (const value of values) {
                heap.push(value);
            }

            expect(heap.size).toBe(values.length);
            expect(Array.from(heap)).toEqual(result);
            expect(heap.top).toBe(0);
        });

        it('adds random values', () => {
            const heap = new Heap();
            const values = getRandomInts(100, 0, 1000);
            const minValue = Math.min(...values);

            for (const value of values) {
                heap.push(value);
            }

            expect(heap.size).toBe(values.length);
            expect(heap.top).toBe(minValue);
        });
    });

    describe('getting the top value', () => {
        it('gets the min value from the min-heap', () => {
            const heap = new Heap();
            const values = getRangeBetween(10, 0);

            for (const value of values) {
                heap.push(value);
            }

            expect(heap.top).toBe(0);
        });

        it('gets the max value from the max-heap', () => {
            const heap = new Heap((a, b) => a > b);
            const values = getRangeBetween(0, 10);

            for (const value of values) {
                heap.push(value);
            }

            expect(heap.top).toBe(10);
        });
    });

    describe('deleting values', () => {
        it('removes the top values in min-heap', () => {
            const heap = new Heap();
            const values = getRangeBetween(0, 10);

            for (const value of values) {
                heap.push(value);
            }

            for (const value of values) {
                expect(heap.pop()).toBe(value);
            }

            expect(heap.empty).toBe(true);
        });

        it('removes the top values in max-heap', () => {
            const heap = new Heap((a, b) => a > b);
            const values = getRangeBetween(10, 0);

            for (const value of values) {
                heap.push(value);
            }

            for (const value of values) {
                expect(heap.pop()).toBe(value);
            }

            expect(heap.empty).toBe(true);
        });

        it('adds and removes values in the ebb and flow way', () => {
            const heap = new Heap();

            for (const value of getRange(0, 10)) {
                heap.push(value);
            }

            heap.pop(); // 0
            heap.pop(); // 1
            heap.pop(); // 2
            heap.pop(); // 3
            heap.pop(); // 4

            for (const value of getRange(0, 5)) {
                heap.push(value);
            }

            for (const value of getRange(10, 5)) {
                heap.push(value);
            }

            for (let i = 0; i < 15; i++) {
                expect(15 - i).toEqual(heap.size);
                expect(i, heap.top);
                heap.pop();
                expect(15 - i - 1).toEqual(heap.size);
            }
        });
    });
});
