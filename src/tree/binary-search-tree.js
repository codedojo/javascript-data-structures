class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    get hasLeft() {
        return this.left !== null;
    }

    get hasRight() {
        return this.right !== null;
    }
}

export default class BinarySearchTree {
    #root = null;
    #size = 0;

    get size() {
        return this.#size;
    }

    get minValue() {
        return this.#findMinNode(this.#root)?.value;
    }

    get maxValue() {
        return this.#findMaxNode(this.#root)?.value;
    }

    add(value) {
        if (this.#root === null) {
            this.#root = new Node(value);
        } else {
            this.#addNode(this.#root, value);
        }
    }

    has(value) {
        return Boolean(this.#findNode(this.#root, value));
    }

    remove(value) {
        if (this.#root === null) return;

        this.#root = this.#removeNode(this.#root, value);
    }

    forEachPreOrder(fn) {
        this.#forEachPreOrder(this.#root, fn);
    }

    forEachInOrder(fn) {
        this.#forEachInOrder(this.#root, fn);
    }

    forEachPostOrder(fn) {
        this.#forEachPostOrder(this.#root, fn);
    }

    toString(order = 'pre') {
        let string = '';

        if (order === 'pre') {
            this.forEachPreOrder(value => string += `${value} `);
        } else if (order === 'in') {
            this.forEachInOrder(value => string += `${value} `);
        } else if (order === 'post') {
            this.forEachPostOrder(value => string += `${value} `);
        }

        return string.trim();
    }

    #addNode(node, value) {
        // Smaller values go to the left
        if (value < node.value) {
            if (!node.hasLeft) {
                node.left = new Node(value);
            } else {
                this.#addNode(node.left, value);
            }
        } else {
            if (!node.hasRight) {
                node.right = new Node(value);
            } else {
                this.#addNode(node.right, value);
            }
        }

        this.#size += 1;
    }

    #removeNode(node, value) {
        if (node === null) return null;

        if (value < node.value) {
            node.left = this.#removeNode(node.left, value);
            return node;
        } else if (value > node.value) {
            node.right = this.#removeNode(node.right, value);
            return node;
        } else {
            if (!node.hasLeft && !node.hasRight) return null;
            if (!node.hasLeft) return node.right;
            if (!node.hasRight) return node.left;

            const minNode = this.#findMinNode(node.right);
            node.value = minNode.value;
            node.right = this.#removeNode(node.right, minNode.value);

            this.#size -= 1;

            return node;
        }
    }

    #findNode(node, value) {
        if (node !== null) {
            if (value === node.value) {
                return node;
            } else if (value < node.value) {
                return this.#findNode(node.left, value);
            } else {
                return this.#findNode(node.right, value);
            }
        }
    }

    #findMinNode(node) {
        let current = node;

        while (current !== null && current.left !== null) {
            current = current.left;
        }

        return current;
    }

    #findMaxNode(node) {
        let current = node;

        while (current !== null && current.right !== null) {
            current = current.right;
        }

        return current;
    }

    // node -> left -> right
    #forEachPreOrder(node, fn) {
        if (node !== null) {
            fn(node.value);
            this.#forEachPreOrder(node.left, fn);
            this.#forEachPreOrder(node.right, fn);
        }
    }

    // left -> node -> right
    #forEachInOrder(node, fn) {
        if (node !== null) {
            this.#forEachInOrder(node.left, fn);
            fn(node.value);
            this.#forEachInOrder(node.right, fn);
        }
    }

    // left -> right -> node
    #forEachPostOrder(node, fn) {
        if (node !== null) {
            this.#forEachPostOrder(node.left, fn);
            this.#forEachPostOrder(node.right, fn);
            fn(node.value);
        }
    }
}