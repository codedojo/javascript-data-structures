export function ASCIIHash(string) {
    let hash = 0;

    for (const char of string) {
        hash += char.charCodeAt(0);
    }

    return hash;
}

export function ASCIIHash2(string) {
    let hash = 0;

    for (const char of string) {
        hash += 37 * hash + char.charCodeAt(0);
    }

    return hash;
}

export function SDBMHash(string) {
    let hash = 0;

    for (const char of string) {
        hash = hash * 65599 + char.charCodeAt(0);
    }

    return hash;
}

export function djb2(string) {
    let hash = 5381;

    for (const char of string) {
        // hash * 33 + c
        hash = ((hash << 5) + hash) + char.charCodeAt(0);
    }

    return hash;
}

export function foldingHash(string) {
    let hash = 0;
    let startIndex = 0;
    let bytes = 0;

    do {
        bytes = getNext4Bytes(string, startIndex);
        hash += bytes;
        startIndex += 4;
    } while (bytes !== 0);

    return hash;
}

function getNext4Bytes(string, startIndex) {
    let bytes = 0b0; // 00000000000000000000000000000000
    bytes += getByte(string, startIndex); // 000000000000000000000000********
    bytes += getByte(string, startIndex + 1) << 8; // 0000000000000000****************
    bytes += getByte(string, startIndex + 2) << 16; // 00000000************************
    bytes += getByte(string, startIndex + 3) << 24; // ********************************

    console.log(string.slice(startIndex, startIndex + 4), ': ', bytes.toString(2).padStart(32, 0), bytes.toString(2).padStart(32, 0).length);

    return bytes;
}

function getByte(string, index) {
    if (index < string.length) {
        return string.charCodeAt(index);
    }

    return 0;
}