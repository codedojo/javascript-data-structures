const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
};

class Node {
    constructor(value, parent, tree) {
        this.value = value;
        this.tree = tree;
        this.parent = parent;
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

export default class AVLTree {
    #root = null;
    #size = 0;

    get size() {
        return this.#size;
    }

    add(value) {
        if (this.#root === null) {
            this.#root = new Node(value, null, this);
        } else {
            this.#addNode(this.#root, value);
        }

        this.#size += 1;
    }

    remove(value) {

    }

    #addNode(node, value) {
        // Case 1: Value is less than the current node value
        if (value.CompareTo(node.Value) < 0) {
            // if there is no left child make this the new left
            if (node.left == null) {
                node.left = new Node(value, node, this);
            } else {
                // else add it to the left node
                this.#addNode(node.left, value);
            }
        }
        // Case 2: Value is equal to or greater than the current value
        else {
            // If there is no right, add it to the right
            if (node.right == null) {
                node.right = new Node(value, node, this);
            } else {
                // else add it to the right node
                this.#addNode(node.right, value);
            }
        }

        const balanceFactor = this.#getBalanceFactor(node);

        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
                // Left left case
                node = this.#rotateRight(node);
            } else {
                // Left right case
                return this.#rotateLeftRight(node);
            }
        }

        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
                // Right right case
                node = this.#rotateLeft(node);
            } else {
                // Right left case
                return this.#rotateRightLeft(node);
            }
        }
    }

    #getBalanceFactor(node) {
        const heightDifference = this.#getNodeHeight(node.left) - this.#getNodeHeight(node.right);

        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
        }
    }

    #getNodeHeight(node) {
        if (node == null) {
            return -1;
        }

        return Math.max(this.#getNodeHeight(node.left), this.#getNodeHeight(node.right)) + 1;
    }

    /**
     *
     *       b                           a
     *      / \                         / \
     *     a   e -> rotateRight(b) ->  c   b
     *    / \                             / \
     *   c   d                           d   e
     *
     */
    #rotateRight(node) {
        const temp = node.left;
        node.left = temp.right;
        temp.right = node;
        return temp;
    }

    /**
     *
     *     a                              b
     *    / \                            / \
     *   c   b   -> rotateLeft(a) ->    a   e
     *      / \                        / \
     *     d   e                      c   d
     *
     */
    #rotateLeft(node) {
        const temp = node.right;
        node.right = temp.left;
        temp.left = node;
        return temp;
    }

    #rotateLeftRight(node) {
        node.left = this.#rotateLeft(node.left);
        return this.#rotateRight(node);
    }

    #rotateRightLeft(node) {
        node.right = this.#rotateRight(node.right);
        return this.#rotateLeft(node);
    }

    #removeNode(node, key) {
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
        }

        // verify if tree is balanced
        const balanceFactor = this.#getBalanceFactor(node);

        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            // Left left case
            if (
                this.#getBalanceFactor(node.left) === BalanceFactor.BALANCED ||
                this.#getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            ) {
                return this.#rotateRight(node);
            }

            // Left right case
            if (this.#getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.#rotateLeftRight(node.left);
            }
        }

        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            // Right right case
            if (
                this.#getBalanceFactor(node.right) === BalanceFactor.BALANCED ||
                this.#getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            ) {
                return this.#rotateLeft(node);
            }
            // Right left case
            if (this.#getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.#rotateRightLeft(node.right);
            }
        }

        return node;
    }
}