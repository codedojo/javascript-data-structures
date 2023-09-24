class Node {
    constructor(value) {
        this.value = value;
        this.parent = null;
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
    }

    addChildBefore(target, node) {

    }

    addChildAfter(target, node) {

    }

    addSibling(node) {
        if (!this.parent) return;

        this.parent.addChild(node);
    }

    removeChild(node) {

    }

    remove() {
        this.parent.removeChild(this);
    }

    removeSibling(node) {
        if (!this.parent) return;

        this.parent.removeChild(node);
    }
}

export default class Tree {
    #root = null;
    #size = 0;

    get size() {
        return this.#size;
    }

    add(value) {
        const node = new Node(value);

        if (this.#root === null) {
            this.#root = node;
        } else {
            this.#root.addChild(node);
        }

        this.#size += 1;
    }

    remove(value) {
        if (this.#root === null) return;

        this.#root = this.#removeNode(this.#root, value);
    }

    has(value) {
        return Boolean(this.#findNode(this.#root, value));
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

    // The node is visited before it's children
    #forEachPreOrder(node, fn) {
        if (node !== null) {
            fn(node.value);
            this.#forEachPreOrder(node.left, fn);
            this.#forEachPreOrder(node.right, fn);
        }
    }

    // The left child is visited before the node, then the right child
    #forEachInOrder(node, fn) {
        if (node !== null) {
            this.#forEachPreOrder(node.left, fn);
            fn(node.value);
            this.#forEachPreOrder(node.right, fn);
        }
    }

    // The left and right children are visited before the node
    #forEachPostOrder(node, fn) {
        if (node !== null) {
            this.#forEachPreOrder(node.left, fn);
            this.#forEachPreOrder(node.right, fn);
            fn(node.value);
        }
    }
}