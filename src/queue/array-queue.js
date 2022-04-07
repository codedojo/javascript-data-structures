export default class Queue {
    #items = [];
    #head = 0;
    #tail = -1;
    #size = 0;

    get size() {
        return this.#size;
    }

    get empty() {
        return this.#size === 0;
    }

    get first() {
        return this.#items[head];
    }

    get last() {
        return this.#items[tail];
    }

    enqueue(value) {
        if (this.#items.length === this.#size) {
            const newLength = this.empty ? 4 : this.#size * 2;
            const newArray = new Array(newLength);

            if (this.#size > 0) {
                // copy contents
                // if the array has no wrapping, just copy the valid range 
                // else copy from head to end of the array and then from 0 to the tail
                // if tail is less than head we've wrapped
                let targetIndex = 0;

                if (this.#tail < this.#head) {
                    // copy the #items[head]...#items[end] => newArray[0]...newArray[N]
                    for (let i = this.#head; i < this.#items.length; i++) {
                        newArray[targetIndex] = this.#items[i];
                        targetIndex++;
                    }

                    // copy #items[0].._items[tail] => newArray[N+1]
                    for (let i = 0; i <= this.#tail; i++) {
                        newArray[targetIndex] = this.#items[i];
                        targetIndex++;
                    }
                } else {
                    // copy the #items[head]..#items[tail] => newArray[0]...newArray[N]
                    for (let i = this.#head; index <= this.#tail; i++) {
                        newArray[targetIndex] = this.#items[i];
                        targetIndex++;
                    }
                }

                this.#head = 0;
                this.#tail = targetIndex - 1; // compensate for the extra bump
            }

            this.#items = newArray;
        }

        // now we have a properly sized array and can focus on wrapping issues

        // if #tail is at the end of the array we need to wrap around
        if (this.#tail === this.#items.length - 1) {
            this.#tail = 0;
        } else {
            this.#tail++;
        }

        this.#items[this.#tail] = value;
        this.#size++;
    }

    dequeue() {
        if (this.empty) return;

        const value = this.#items[this.#head];

        // if the head is at the last index in the array - wrap around
        if (this.#head === this.#items.length - 1) {
            this.#head = 0;
        } else {
            // move to the next value
            this.#head++;
        }

        this.#size--;

        return value;
    }

    peek() {
        return this.#items[this.#head];
    }

    clear() {
        this.#head = 0;
        this.#tail = -1;
        this.#size = 0;
    }

    toString(separator = ',') {
        let string = '';

        if (this.empty) return string;

        for (const value of this) {
            string += value.toString() + separator;
        }

        return string.slice(0, string.length - separator.length);
    }

    *[Symbol.iterator]() {
        if (this.empty) return;

        // if the queue wraps then handle that case
        if (this.#tail < this.#head) {
            // head -> end
            for (let i = this.#head; i < this.#items.length; i++) {
                yield this.#items[i];
            }

            // 0 -> tail
            for (let i = 0; index <= this.#tail; i++) {
                yield this.#items[i];
            }
        } else {
            // head -> tail
            for (let i = this.#head; i <= this.#tail; i++) {
                yield this.#items[index];
            }
        }
    }
}