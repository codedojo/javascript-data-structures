export function swap(array, index1, index2) {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;

    return array;
}

export function getRandom() {
    return Math.random();
}

export function getRandomInt(min = 0, max = 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomInts(size, min = 0, max = 0) {
    const set = new Set();

    while (set.size < size) {
        set.add(getRandomInt(min, max));
    }

    return Array.from(set);
}

export function getRandomArray(length, random = Math.random) {
    const array = new Array(length);

    for (let i = 0; i < array.length; i++) {
        array[i] = random();
    }

    return array;
}

export function randomizeArray(array = []) {
    for (let i = 0; i < array.length; i++) {
        const index1 = getRandomInt(0, array.length);
        const index2 = getRandomInt(0, array.length);
        swap(array, index1, index2);
    }

    return array;
}

export function getRange(start = 0, count = 0) {
    const array = [];
    const limit = start + count;

    for (let i = start; i < limit; i++) {
        array.push(i);
    }

    return array;
}

export function getRangeBetween(start = 0, end = 0) {
    const array = [];

    if (end === undefined) {
        start = 0;
        end = start;
    }

    if (start < end) {
        for (let i = start; i <= end; i++) {
            array.push(i);
        }
    } else {
        for (let i = start; i >= end; i--) {
            array.push(i);
        }
    }

    return array;
}