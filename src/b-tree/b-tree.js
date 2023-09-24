class Node {
    #minimalDegree;
    values = [];
    children = [];

    get isLeaf() {
        return this.children.length === 0;
    }

    get isFull() {
        return this.values.length === this.#minimalDegree * 2 - 1;
    }

    get isMinimal() {
        return this.values.length === this.#minimalDegree - 1;
    }

    constructor(degree, values, children) {
        this.#minimalDegree = degree;
        this.values = values;
        this.children = children;

        this.#validate();
    }

    addAt(index, value) {

    }

    childAt(index) {
        return this.children.at(index);
    }

    #validate() {
        if (this.values.length === 0) {
            throw new Error('Every node must have at least one value');
        }

        if (this.children.length > 0) {
            if (this.values.length !== this.children.length - 1) {
                throw new Error('The number of values must be one less than the number of children');
            }
        }

        if (this.values.length >= (this.#minimalDegree * 2 + 1)) {
            throw new Error('The number of values exceeds the degree limit');
        }
    }
}

export default class BTree {
    #root = null;
    #minimalDegree;
    #size = 0;
    #height = 0;

    get size() {
        return this.#size;
    }

    get isEmpty() {
        return this.#size === 0;
    }

    constructor(minimalDegree = 7) {
        this.#minimalDegree = minimalDegree;
    }

    add(value) {
        if (this.empty) {
            this.#root = new Node(value, [value], []);
        } else {
            // if the root is full we need to split it before we insert into it (we only insert into non-full nodes)
            if (this.#root.isFull) {
                this.#splitRootNode(this.#root);
            }

            // now that we know the root is not full we can insert into it
            this.#insertNonFull(this.#root, value);
        }

        this.#size++;
    }

    #insertNonFull(node, value) {
        // we only add values to leaf nodes
        if (node.isLeaf) {
            // add the value in sort order
            node.addAt(this.#childIndex(node, value), value);
        } else {
            // find the child where the value would be added
            const childIndex = this.#childIndex(node, value);
            let child = node.childAt(childIndex);

            // if that child is full then split it
            if (child.isFull) {
                this.#splitChildNode(node, childIndex);

                // re-find the child node where the value would be added
                child = node.childAt(this.#childIndex(node, value));
            }

            // insert the node into our non-full child
            this.#insertNonFull(child, value);
        }
    }

    /*
     * Splits a child node by pulling the middle node up from it
     * into the current (parent) node.
     * 
     *       [3          9]
     *  [1 2] [4 5 6 7 8] [10 11]
     * 
     * splitting [4 5 6 7 8] would pull 6 up to its parent
     * 
     *      [3     6     9]
     *  [1 2] [4 5] [7 8] [10 11]
     */
    #splitChildNode(parent, childIndex) {
        const child = parent.childAt(childIndex);

        // the child value index we'll split at (6)
        let middleIndex = Math.floor(child.valuesSize / 2);

        // [4 5]
        let left = new Node(this.#minimalDegree,);
    }
}