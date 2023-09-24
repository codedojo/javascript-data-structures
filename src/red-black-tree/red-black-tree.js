const Color = {
    RED: 'red',
    BLACK: 'black'
};

class Node {
    constructor(value, color, parent) {
        this.value = value;
        this.color = color;
        this.parent = parent;
    }

    get isRed() {
        return this.color === Color.RED;
    }

    get isBlack() {
        return this.color === Color.BLACK;
    }
}

export default class RedBlackTree {
    #root = null;

    add(value) {
        if (this.#root === null) {
            this.#root = new Node(value);
            this.#root.color = Color.BLACK;
        } else {
            const newNode = this.#addNode(this.#root, value);
            this.#balance(newNode);
        }
    }

    #addNode(node, value) {
        if (this.compareFn(value, node.value) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new RedBlackNode(value);
                node.left.parent = node; // {8}
                return node.left; // {9}
            } else {
                return this.insertNode(node.left, value);
            }
        } else if (node.right == null) {
            node.right = new RedBlackNode(value);
            node.right.parent = node; // {10}
            return node.right; // {11}
        } else {
            return this.insertNode(node.right, value);
        }
    }

    #balance(node) {
        while (node && node.parent && node.parent.color.isRed() // {1}
            && node.color !== Colors.BLACK) { // {2}
            let parent = node.parent; // {3}

            const grandParent = parent.parent; // {4}
            // case A: parent is left child
            if (grandParent && grandParent.left === parent) { // {5}
                const uncle = grandParent.right; // {6}
                // case 1A: uncle of node is also red - only recoloring
                if (uncle && uncle.color === Colors.RED) { // {7}
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    node = grandParent; // {8}
                }
                else {
                    // case 2A: node is right child - left rotate
                    // case 3A: node is left child - right rotate
                }
            }
            else { // case B: parent is right child
                const uncle = grandParent.left; // {9}
                // case 1B: uncle is read - only recoloring
                if (uncle && uncle.color === Colors.RED) { // {10}
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    node = grandParent;
                }
                else {
                    // case 2B: node is left child - right rotate
                    // case 3B: node is right child - left rotate
                }
            }
        }

        this.root.color = Colors.BLACK; // {11}
    }

    #rotationLL(node) {
        const tmp = node.left;
        node.left = tmp.right;
        if (tmp.right && tmp.right.key) {
            tmp.right.parent = node;
        }
        tmp.parent = node.parent;
        if (!node.parent) {
            this.root = tmp;
        }
        else {
            if (node === node.parent.left) {
                node.parent.left = tmp;
            }
            else {
                node.parent.right = tmp;
            }
        }
        tmp.right = node;
        node.parent = tmp;
    }

    #rotationRR(node) {
        const tmp = node.right;
        node.right = tmp.left;
        if (tmp.left && tmp.left.key) {
            tmp.left.parent = node;
        }
        tmp.parent = node.parent;
        if (!node.parent) {
            this.root = tmp;
        }
        else {
            if (node === node.parent.left) {
                node.parent.left = tmp;
            }
            else {
                node.parent.right = tmp;
            }
        }
        tmp.left = node;
        node.parent = tmp;
    }
}