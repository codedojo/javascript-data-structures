class Node {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

export default class DoublyLinkedList {
    #head = null;
    #tail = null;
    #size = 0;

    get size() {
        return this.#size;
    }

    get empty() {
        return this.#size === 0;
    }

    get first() {
        return this.#head?.value;
    }

    get last() {
        return this.#tail?.value;
    }

    constructor(items = []) {
        for (const item of items) {
            this.addLast(item);
        }
    }

    addFirst(value) {
        const newNode = new Node(value);

        if (this.#head === null) {
            this.#tail = newNode;
        } else {
            this.#head.prev = newNode;
            newNode.next = this.#head;
        }

        this.#head = newNode;

        this.#size += 1;
    }

    addLast(value) {
        const newNode = new Node(value);

        if (this.#head === null) {
            this.#head = newNode;
        } else {
            this.#tail.next = newNode;
            newNode.prev = this.#tail;
        }

        this.#tail = newNode;

        this.#size += 1;
    }

    addBefore(targetValue, newValue) {
        const targetNode = this.#findNode(targetValue);

        if (!targetNode) return;

        if (targetNode === this.#head) {
            return this.addFirst(newValue);
        }

        const newNode = new Node(newValue);
        const prevNode = targetNode.prev;

        prevNode.next = newNode;
        newNode.prev = prevNode;
        newNode.next = targetNode;
        targetNode.prev = newNode;

        this.#size += 1;
    }

    addAfter(targetValue, newValue) {
        const targetNode = this.#findNode(targetValue);

        if (!targetNode) return;

        if (targetNode === this.#tail) {
            return this.addLast(newValue);
        }

        const newNode = new Node(newValue);
        const nextNode = targetNode.next;

        targetNode.next = newNode;
        newNode.prev = targetNode;
        newNode.next = nextNode;
        nextNode.prev = newNode;

        this.#size += 1;
    }

    add(...values) {
        for (const value of values) {
            this.addLast(value);
        }
    }

    has(value) {
        return Boolean(this.#findNode(value));
    }

    removeFirst() {
        if (this.#head === null) return;

        if (this.#head === this.#tail) {
            this.#head = null;
            this.#tail = null;
        } else {
            this.#head = this.#head.next;
            this.#head.prev = null;
        }

        this.#size -= 1;
    }

    removeLast() {
        if (this.#head === null) return;

        if (this.#head === this.#tail) {
            this.#head = null;
            this.#tail = null;
        } else {
            const prevNode = this.#tail.prev;

            this.#tail = prevNode;
            this.#tail.next = null;
        }

        this.#size -= 1;
    }

    remove(value) {
        if (this.#head === null) return;

        if (this.#head.value === value) {
            return this.removeFirst();
        }

        if (this.#tail.value === value) {
            return this.removeLast();
        }

        const targetNode = this.#findNode(value);

        if (!targetNode) return;

        const prevNode = targetNode.prev;
        const nextNode = targetNode.next;

        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        targetNode.prev = null;
        targetNode.next = null;

        this.#size -= 1;

        return true;
    }

    clear() {
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
    }

    toString(separator = ',') {
        let result = '';
        let current = this.#head;

        while (current !== null) {
            result += current.value;

            if (current !== this.#tail) {
                result += separator;
            }

            current = current.next;
        }

        return result;
    }

    #findNode(value) {
        let current = this.#head;

        while (current !== null) {
            if (current.value === value) {
                return current;
            }

            current = current.next;
        }
    }

    *iterator(dir = 1) {
        if (dir === 1) {
            let current = this.#head;

            while (current !== null) {
                yield current.value;
                current = current.next;
            }
        } else {
            let current = this.#tail;

            while (current !== null) {
                yield current.value;
                current = current.prev;
            }
        }
    }

    *[Symbol.iterator]() {
        yield* this.iterator(1);
    }
}