const NUM_OF_SNOWFLAKES = 10;
const MIN_VALUE = 0;
const MAX_VALUE = 2;

function identicalRight(array1, array2, start) {
    for (let i = 0; i < 6; i++) {
        if (array1[i] !== array2[(start + i) % 6])
            return false;
    }

    return true;
}

function identicalLeft(array1, array2, start) {
    for (let i = 0; i < 6; i++) {
        let j = start - i;

        if (j < 0)
            j = j + 6;

        if (array1[i] != array2[j])
            return false;
    }

    return true;
}

function areIdentical(array1, array2) {
    for (let start = 0; start < 6; start++) {
        if (identicalRight(array1, array2, start))
            return true;
        if (identicalLeft(array1, array2, start))
            return true;
    }

    return false;
}

function identifyIdentical(arrays) {
    const length = arrays.length;

    for (let i = 0; i < length; i++) {
        for (let j = i + 1; j < length; j++) {
            if (areIdentical(arrays[i], arrays[j])) {
                console.log("Twin snowflakes found.\n");
                return;
            }
        }
    }

    console.log("No two snowflakes are alike.\n");
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const snowflakes = [];

for (let i = 0; i < NUM_OF_SNOWFLAKES; i++) {
    snowflakes[i] = [];

    for (let j = 0; j < 6; j++) {
        snowflakes[i][j] = getRandomIntInclusive(MIN_VALUE, MAX_VALUE);
    }
}

console.log(snowflakes);