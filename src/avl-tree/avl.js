const TreeState = {
    BALANCED: 0,
    LEFT_HEAVY: -1,
    RIGHT_HEAVY: 1,
};

class Node {
    constructor(value, parent, tree) {
        this.value = value;
        this.tree = tree;
        this.parent = parent;
        this._left = null;
        this._right = null;
    }

    get left() {
        return this._left;
    }

    set left(node) {
        this._left = node;

        if (this._left !== null) {
            this._left.parent = this;
        }
    }

    get right() {
        return this._right;
    }

    set right(node) {
        this._right = node;

        if (this._right !== null) {
            this._right.parent = this;
        }
    }

    get leftHeight() {
        return this.maxChildHeight(this.left);
    }

    get rightHeight() {
        return this.maxChildHeight(this.right);
    }

    get balanceFactor() {
        return this.rightHeight - this.leftHeight;
    }

    get state() {
        if (this.leftHeight - this.rightHeight > 1) {
            return TreeState.LEFT_HEAVY;
        }

        if (this.rightHeight - this.leftHeight > 1) {
            return TreeState.RIGHT_HEAVY;
        }

        return TreeState.BALANCED;
    }

    balance() {
        if (this.state === TreeState.RIGHT_HEAVY) {
            if (this.hasRight && this.right.balanceFactor < 0) {
                this.rotateRightLeft();
            } else {
                this.rotateLeft();
            }
        } else if (this.state === TreeState.LEFT_HEAVY) {
            if (this.hasLeft && this.left.balanceFactor > 0) {
                this.rotateLeftRight();
            } else {
                this.rotateRight();
            }
        }
    }

    rotateLeft() {
        //     a (this)
        //      \
        //       b (new root)
        //        \
        //         c
        //
        // becomes
        //       b
        //      / \
        //     a   c

        const newRoot = this.right;

        // replace the current root with the new root
        // this.replaceRoot(newRoot);

        if (this.parent === null) {
            this.tree.root = newRoot;
        } else {
            this.parent.right = newRoot;
        }

        newRoot.parent = this.parent;
        this.parent = newRoot;

        // take ownership of right's left child as right (now parent)
        this.right = newRoot.left;

        // the new root takes this as it's left
        newRoot.left = this;
    }

    rotateRight() {
        //     c (this)
        //    /
        //   b (new root)
        //  /
        // a
        //
        // becomes
        //       b
        //      / \
        //     a   c

        const newRoot = this.left;

        // replace the current root with the new root
        // this.replaceRoot(newRoot);

        if (this.parent === null) {
            this.tree.root = newRoot;
        } else {
            this.parent.left = newRoot;
        }

        newRoot.parent = this.parent;
        this.parent = newRoot;

        // take ownership of left's right child as left (now parent)
        this.left = newRoot.right;

        // the new root takes this as it's right
        newRoot.right = this;
    }

    rotateRightLeft() {
        //     a (this)
        //      \
        //       b
        //      /
        //     c
        this.right.rotateRight();
        //     a (this)
        //      \
        //       c
        //        \
        //         b
        this.rotateLeft();
        //       c
        //      / \
        //     a   b
    }

    rotateLeftRight() {
        //     a (this)
        //    /
        //   b
        //    \
        //     c
        this.left.rotateLeft();
        //     a (this)
        //    /
        //   c
        //  /
        // b
        this.rotateRight();
        //       c
        //      / \
        //     b   a
    }

    replaceRoot(newRoot) {
        if (this.parent === null) {
            this.tree.root = newRoot;
        } else {
            if (this.parent.left === this) {
                this.parent.left = newRoot;
            } else if (this.parent.right === this) {
                this.parent.right = newRoot;
            }
        }

        newRoot.parent = this.parent;
        this.parent = newRoot;
    }

    maxChildHeight(node) {
        if (node === null) return 0;

        return Math.max(this.maxChildHeight(node.left), this.maxChildHeight(node.right)) + 1;
    }
}

export default class AVLTree {
    #root = null;
    #size = 0;

    get size() {
        return this.#size;
    }

    set root(node) {
        this.#root = node;
    }

    add(value) {
        // Case 1: The tree is empty - allocate the head
        if (this.#root === null) {
            this.#root = new Node(value, null, this);
        }
        // Case 2: The tree is not empty so find the right location to insert
        else {
            this.#addTo(this.#root, value);
        }

        this.#size++;
    }

    has(value) {
        return Boolean(this.#findNode(value));
    }

    remove(value) {
        let current = this.#findNode(value);

        if (current === null) return false;

        let treeToBalance = current.parent;

        this.#size--;

        // Case 1: If current has no right child, then current's left replaces current
        if (current.right === null) {
            if (current.parent === null) {
                this.#root = current.left;

                if (this.#root !== null) {
                    this.#root.parent = null;
                }
            } else {
                // if parent value is greater than current value
                if (parent.value > current.value) {
                    // make the current left child a left child of parent
                    current.parent.left = current.left;
                }
                // if parent value is less than current value
                else if (parent.value < current.value) {
                    // make the current left child a right child of parent
                    current.parent.right = current.left;
                }
            }
        }
        // Case 2: If current's right child has no left child, then current's right child
        //         replaces current
        else if (current.right.left === null) {
            current.right.left = current.left;

            if (current.parent === null) {
                this.#root = current.right;

                if (this.#root !== null) {
                    this.#root.parent = null;
                }
            } else {
                // if parent value is greater than current value
                if (parent.value > current.value) {
                    // make the current right child a left child of parent
                    current.Parent.Left = current.Right;
                }
                // if parent value is less than current value
                else if (parent.value < current.value) {
                    // make the current right child a right child of parent
                    current.Parent.Right = current.Right;
                }
            }
        }
        // Case 3: If current's right child has a left child, replace current with current's
        //         right child's left-most child
        else {
            // find the right's left-most child
            let leftmost = current.right.left;

            while (leftmost.left !== null) {
                leftmost = leftmost.left;
            }

            // the parent's left subtree becomes the leftmost's right subtree
            leftmost.parent.left = leftmost.right;

            // assign leftmost's left and right to current's left and right children
            leftmost.left = current.left;
            leftmost.right = current.right;

            if (current.parent === null) {
                this.#root = leftmost;

                if (this.#root !== null) {
                    this.#root.parent = null;
                }
            } else {
                // if parent value is greater than current value
                if (parent.value > current.value) {
                    // make leftmost the parent's left child
                    current.parent.left = leftmost;
                }
                // if parent value is less than current value
                else if (parent.value < current.value) {
                    // make leftmost the parent's right child
                    current.parent.right = leftmost;
                }
            }
        }

        if (treeToBalance !== null) {
            treeToBalance.balance();
        } else {
            if (this.#root !== null) {
                this.#root.balance();
            }
        }

        return true;
    }

    // Recursive add algorithm
    #addTo(node, value) {
        // Case 1: Value is less than the current node value
        if (value < node.value) {
            // if there is no left child make this the new left
            if (node.left === null) {
                node.left = new Node(value, node, this);
                node.balance();
            } else {
                // else add it to the left node
                this.#addTo(node.left, value);
            }
        }
        // Case 2: Value is equal to or greater than the current value
        else {
            // If there is no right, add it to the right
            if (node.right === null) {
                node.right = new Node(value, node, this);
                node.balance();
            } else {
                // else add it to the right node
                this.#addTo(node.right, value);
            }
        }
    }

    #findNode(value) {
        // Now, try to find data in the tree
        let current = this.#root;

        // while we don't have a match
        while (current !== null) {
            if (value < current.value) {
                // if the value is less than current, go left.
                current = current.left;
            } else if (value > current.value) {
                // if the value is more than current, go right.
                current = current.right;
            } else {
                // we have a match!
                break;
            }
        }

        return current;
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

    #forEachPreOrder(node, fn) {
        if (node !== null) {
            fn(node.value);
            this.#forEachPreOrder(node.left, fn);
            this.#forEachPreOrder(node.right, fn);
        }
    }

    #forEachInOrder(node, fn) {
        if (node !== null) {
            this.#forEachInOrder(node.left, fn);
            fn(node.value);
            this.#forEachInOrder(node.right, fn);
        }
    }

    #forEachPostOrder(node, fn) {
        if (node !== null) {
            this.#forEachPostOrder(node.left, fn);
            this.#forEachPostOrder(node.right, fn);
            fn(node.value);
        }
    }
}