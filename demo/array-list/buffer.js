import ArrayList from '../array-list.js';

class StringBuffer {
    #chars;
    #cursor;

    constructor(length) {
        this.#chars = new ArrayList(length);
        this.#cursor = 0;
    }

    get length() {
        return this.#chars.size;
    }

    get cursorPosition() {
        return this.#cursor;
    }

    insertCharacter(char) {
        this.#chars.addAt(char, this.#cursor);
        this.#chars++;
    }

    deleteCharacter() {
        this.#chars.set(this.#cursor, '');
    }

    moveCursorForward() {
        if (this.#cursor < this.#chars.length) {
            this.#cursor++;
        }
    }

    moveCursorBackward() {
        if (this.#cursor > 0) {
            this.#cursor--;
        }
    }

    moveCursorToStart() {
        this.#cursor = 0;
    }

    moveCursorToEnd() {
        this.#cursor = this.#chars.length - 1;
    }

    moveCursorTo(position) {
        if (position < 0 || position >= this.length) return;

        this.#cursor = position;
    }

    toString() {
        return this.#chars.toString();
    }
}

const buffer = new StringBuffer(64);

buffer.insertCharacter('H');

console.log(buffer);