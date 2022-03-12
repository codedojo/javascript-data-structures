class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export default class LinkedList {
    #head = null;
    #tail = null;
    #length = 0;

    constructor(...args) {
        for (const value of args) {
            this.append(value);
        }
    }

    get first() {
        return this.#head?.value;
    }

    get last() {
        return this.#tail?.value;
    }

    get length() {
        return this.#length;
    }

    append(value) {
        const node = new Node(value);

        if (this.#head === null) {
            this.#head = node;
            this.#tail = node;
        } else {
            this.#tail.next = node;
            this.#tail = node;
        }

        this.#length += 1;
    }

    prepend(value) {
        const node = new Node(value);

        if (this.#head === null) {
            this.#head = node;
            this.#tail = node;
        } else {
            node.next = this.#head;
            this.#head = node;
        }

        this.#length += 1;
    }

    insert(newValue, afterValue) {
        const current = this.#find(afterValue);

        if (!current) return false;

        const node = new Node(newValue);
        const next = current.next;

        current.next = node;
        node.next = next;

        this.#length += 1;

        return true;
    }

    remove(value) {
        let current = this.#head;
        let previous = null;

        while (current !== null) {
            if (current.value === value) {
                if (this.#head === this.#tail) {
                    // remove the only element
                    this.#head = null;
                    this.#tail = null;
                } else if (previous === null) {
                    // remove the first element
                    this.#head = current.next;
                } else if (current.next === null) {
                    // remove the last element
                    this.#tail = previous;
                    this.#tail.next = null;
                } else {
                    // remove from middle or end
                    previous.next = current.next;
                    current.next = null;
                }

                this.#length -= 1;

                return true;
            }

            previous = current;
            current = current.next;
        }

        return false;
    }

    has(value) {
        return Boolean(this.#find(value));
    }

    toString() {
        return Array.from(this).join();
    }

    #find(value) {
        let current = this.#head;

        while (current !== null) {
            if (current.value === value) {
                return current;
            }

            current = current.next;
        }
    }

    *[Symbol.iterator]() {
        let current = this.#head;

        while (current !== null) {
            yield current.value;
            current = current.next;
        }
    }
}