class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export default class LinkedList {
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
        const prevNode = this.#findPrevNode(targetValue);

        prevNode.next = newNode;
        newNode.next = targetNode;

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
        newNode.next = nextNode;

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
        }

        this.#size -= 1;
    }

    removeLast() {
        if (this.#head === null) return;

        if (this.#head === this.#tail) {
            this.#head = null;
            this.#tail = null;
        } else {
            const prevNode = this.#findPrevNode(this.#tail.value);

            prevNode.next = null;
            this.#tail = prevNode;
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

        const prevNode = this.#findPrevNode(value);

        if (!prevNode) return;

        const currNode = prevNode.next;
        const nextNode = currNode.next;

        prevNode.next = nextNode;
        currNode.next = null;

        this.#size -= 1;
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

    #findPrevNode(value) {
        let current = this.#head;

        while (current.next !== null) {
            if (current.next.value === value) {
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