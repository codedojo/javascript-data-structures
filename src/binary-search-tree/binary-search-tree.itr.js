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

    add(value) {
        const node = new Node(value);

        if (this.#root === null) {
            this.#root = node;
        } else {
            let current = this.#root;
            let parent;

            while (true) {
                parent = current;

                if (value < current.value) {
                    current = current.left;

                    if (current === null) {
                        parent.left = node;
                        break;
                    }
                } else {
                    current = current.right;

                    if (current === null) {
                        parent.right = node;
                        break;
                    }
                }
            }
        }

        this.#size += 1;
    }

    has(value) {
        return Boolean(this.#find(value));
    }

    remove(value) {
        let { node: current, parent } = this.#findWithParent(value);

        if (current === null) return false;

        // Case 1: If current has no right child, then current's left replaces current
        if (current.right === null) {
            if (parent === null) {
                this.#root = current.left;
            } else {
                if (parent.value > current.value) {
                    // if parent value is greater than current value
                    // make the current left child a left child of parent
                    parent.left = current.left;
                } else if (parent.value < current.value) {
                    // if parent value is less than current value
                    // make the current left child a right child of parent
                    parent.right = current.left;
                }
            }
        }
        // Case 2: If current's right child has no left child, then current's right child replaces current
        else if (current.right.left === null) {
            current.right.left = current.left;

            if (parent === null) {
                this.#root = current.right;
            } else {
                if (parent.value > current.value) {
                    // if parent value is greater than current value
                    // make the current right child a left child of parent
                    parent.left = current.right;
                } else if (parent.value < current.value) {
                    // if parent value is less than current value
                    // make the current right child a right child of parent
                    parent.right = current.right;
                }
            }
        }
        // Case 3: if current's right child has a left child, replace current with current's right child's left-most child
        else {
            // find the right's left-most- child
            let leftMost = current.right.left;
            let leftMostParent = current.right;

            while (leftMost.left !== null) {
                leftMostParent = leftMost;
                leftMost = leftMost.left;
            }

            // the parent's left subtree becomes the leftmost's right subtree
            leftMostParent.left = leftMost.right;

            // assign leftmost's left and right to current's left and right children
            leftMost.left = current.left;
            leftMost.right = current.right;

            if (parent === null) {
                this.#root = leftMost;
            } else {
                if (parent.value > current.value) {
                    // if parent value is greater than current value
                    // make leftmost the parent's left child
                    parent.left = leftMost;
                } else if (parent.value < current.value) {
                    // if parent value is less than current value
                    // make leftmost the parent's right child
                    parent.right = leftMost;
                }
            }
        }

        this.#size -= 1;

        return true;
    }

    forEachPreOrder(fn) {
        for (const value of this.preOrder()) {
            fn(value);
        }
    }

    forEachInOrder(fn) {
        for (const value of this.inOrder()) {
            fn(value);
        }
    }

    forEachPostOrder(fn) {
        for (const value of this.postOrder()) {
            fn(value);
        }
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

    #find(value) {
        let current = this.#root;

        while (current !== null) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                return current;
            }
        }
    }

    #findWithParent(value) {
        let current = this.#root;
        let parent = null;

        while (current !== null) {
            if (value < current.value) {
                // if the value is less than current, go left
                parent = current;
                current = current.left;
            } else if (value > current.value) {
                // if the value is greater than current, go right
                parent = current;
                current = current.right;
            } else {
                // we have a match
                break;
            }
        }

        return {
            node: current,
            parent
        };
    }

    // node -> left -> right
    *preOrder() {
        if (this.#root === null) return;

        const stack = [];

        stack.push(this.#root);

        while (stack.length > 0) {
            const node = stack.pop();

            yield node.value;

            // Right child is pushed first so that left is processed first
            if (node.hasRight) {
                stack.push(node.right);
            }

            if (node.hasLeft) {
                stack.push(node.left);
            }
        }
    }

    // left -> node -> right
    *inOrder() {
        if (this.#root === null) return;

        // store the nodes we've skipped in this stack (avoids recursion)
        const stack = [];

        let current = this.#root;

        // when removing recursion we need to keep track of whether or not we should be going to the left node or the right node next
        let goLeft = true;

        stack.push(current);

        while (stack.length > 0) {
            // if we're heading left
            if (goLeft) {
                // push everything but the left-most node to the stack
                while (current.left !== null) {
                    stack.push(current);
                    current = current.left;
                }
            }

            yield current.value;

            // if we can go right then do so
            if (current.hasRight) {
                current = current.right;

                // once we've gone right once, we need to start going left again
                goLeft = true;
            } else {
                // if we can't go right then we need to pop off the parent node so we can process it and then go to it's right node
                current = stack.pop();
                goLeft = false;
            }
        }
    }

    // left -> right -> node
    *postOrder() {
        if (this.#root === null) return;

        const next = [];
        const processed = [];

        next.push(this.#root);

        while (next.length > 0) {
            const node = next.pop();

            processed.push(node);

            if (node.hasLeft) {
                next.push(node.left);
            }

            if (node.hasRight) {
                next.push(node.right);
            }
        }

        while (processed.length > 0) {
            const node = processed.pop();
            yield node.value;
        }
    }

    *levelOrder() {
        if (this.#root === null) return;

        const queue = [];

        queue.push(this.#root);

        while (queue.length > 0) {
            const node = queue.shift();

            yield node.value;

            if (node.left) {
                queue.push(node.left);
            }

            if (node.right) {
                queue.push(node.right);
            }
        }
    }

    *[Symbol.iterator]() {
        yield* this.inOrder();
    }
}