export default class Graph {
    #items = new Map();
    #isDirected = false;

    constructor(isDirected = false) {
        this.#isDirected = isDirected;
    }

    get nodes() {
        return Array.from(this.#items.keys());
    }

    get edges() {
        const edges = [];

        for (const [node, neighbors] of this.#items) {
            for (const [neighbor, weight] of neighbors) {
                edges.push([node, neighbor, weight]);
            }
        }

        return edges;
    }

    get isDirected() {
        return this.#isDirected;
    }

    addNode(v) {
        if (!this.#items.has(v)) {
            this.#items.set(v, new Map());
        }
    }

    addEdge(v1, v2, weight = 1) {
        if (!this.#items.has(v1)) {
            this.addNode(v1);
        }

        if (!this.#items.has(v2)) {
            this.addNode(v2);
        }

        this.#items.get(v1).set(v2, weight);

        if (this.isDirected !== true) {
            this.#items.get(v2).set(v1, weight);
        }
    }

    removeNode(v) {
        this.#items.delete(v);

        for (const [node, neighbors] of this.#items) {
            if (neighbors.has(v)) {
                this.removeEdge(node, v);
            }
        }
    }

    removeEdge(v1, v2) {
        if (this.#items.has(v1)) {
            this.#items.get(v1).delete(v2);
        }

        if (this.#items.has(v2)) {
            this.#items.get(v2).delete(v1);
        }
    }

    forEachBreadthFirst(fn) {
        const [first] = this.nodes;
        const visited = new Set();
        this.#forEachDepthFirst(first, visited, fn);
    }

    toString() {
        console.log({
            items: this.#items,
            nodes: this.nodes,
            edges: this.edges
        });

        // let string = '';

        // for (const node of this.#nodes) {
        //     string += node + ' -> ';

        //     const neighbors = this.#items.get(node);

        //     for (const neighbor of neighbors) {
        //         string += `${neighbor} `;
        //     }

        //     string += '\n';
        // }

        // return string;
    }

    #forEachDepthFirst(node, visited, fn) {
        if (visited.has(node)) return;

        fn(node);

        visited.add(node);

        for (const n of this.#items.get(node)) {
            this.#forEachDepthFirst(n, visited, fn);
        }
    }

    *depthFirst(startnode) {
        const stack = [startnode];
        const marked = new Set();

        while (stack.length > 0) {
            const node = stack.pop();

            marked.add(node);

            const neighbors = this.#items.get(node);

            for (const v of neighbors) {
                if (!marked.has(v)) {
                    marked.add(v);
                    stack.push(v);
                    break;
                }
            }

            yield node;
        }
    }

    *breadthFirst(startnode) {
        const queue = [startnode];
        const marked = new Set();

        while (queue.length > 0) {
            const node = queue.shift();

            if (!marked.has(node)) {
                marked.add(node);

                yield node;

                const neighbors = this.#items.get(node);

                for (const v of neighbors) {
                    queue.push(v);
                }
            }
        }
    }
}

const graph = new Graph();
const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

for (const v of vertices) {
    graph.addNode(v);
}

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

console.log(graph.toString());

graph.removeNode('A');

console.log(graph.toString());

// for (const v of graph.depthFirst('A')) {
//     console.log(v);
// }

// for (const v of graph.breadthFirst('A')) {
//     console.log(v);
// }