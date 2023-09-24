class Node {
    #edges = new Set();

    constructor(value) {
        this.value = value;
    }

    get edges() {
        return Array.from(this.#edges);
    }

    get neighbors() {
        const neighbors = [];

        for (const edge of this.#edges) {
            const neighbor = edge.fromNode === this ? edge.toNode : edge.fromNode;
            neighbor.edge = edge;
            neighbors.push(neighbor);
        }

        return neighbors;
    }

    addEdge(edge) {
        this.#edges.add(edge);
    }

    hasEdge(edge) {
        return this.#edges.has(edge);
    }

    findEdge(vertex) {
        for (const edge of this.edges) {
            if (edge.fromNode === vertex || edge.toNode === vertex) {
                return edge;
            }
        }
    }

    removeEdge(edge) {
        this.#edges.delete(edge);
    }

    removeEdges() {
        for (const edge of this.edges) {
            this.removeEdge(edge);
        }
    }

    hasNeighbor(vertex) {
        for (const v of this.neighbors) {
            if (v === vertex) {
                return v;
            }
        }
    }

    toString() {
        return this.value.toString();
    }
}

class Edge {
    constructor(fromNode, toNode, weight) {
        this.fromNode = fromNode;
        this.toNode = toNode;
        this.weight = weight;
    }

    toString() {
        return `${this.fromNode} -> ${this.toNode}`;
    }
}

export default class Graph {
    #nodes = new Set();
    #edges = new Set();
    #nodeMap = new Map();
    #isDirected = false;

    get nodes() {
        return Array.from(this.#nodes);
    }

    get edges() {
        return Array.from(this.#edges);
    }

    constructor(isDirected = false) {
        this.#isDirected = isDirected;
    }

    addNode(value) {
        const node = new Node(value);
        this.#nodes.add(node);
        this.#nodeMap.set(value, node);
    }

    addEdge(value1, value2, weight) {
        const node1 = this.#nodeMap.get(value1);
        const node2 = this.#nodeMap.get(value2);

        const edge1 = new Edge(node1, node2, weight);
        node1.addEdge(edge1);
        this.#edges.add(edge1);

        if (!this.#isDirected) {
            const edge2 = new Edge(node2, node1, weight);
            node2.addEdge(edge2);
            this.#edges.add(edge2);
        }
    }

    toString() {
        let result = '';

        for (const v of graph.nodes) {
            result += v.value + ' -> ';

            let commaNeeded = false;

            for (const edge of v.edges) {
                if (commaNeeded) result += ', ';
                result += edge.toNode.value;
                commaNeeded = true;
            }

            result += '\n';
        }

        return result;
    }

    forEachBreadthFirst(fn) {
        const visited = new Set();
        const [first] = this.#nodes;
        const queue = [first];

        while (queue.length > 0) {
            const node = queue.shift();

            if (!visited.has(node)) {
                fn(node.value);

                visited.add(node);

                for (const edge of node.edges) {
                    queue.push(edge.toNode);
                }
            }
        }
    }

    forEachDepthFirst(fn) {
        const [first] = this.#nodes;
        const visited = new Set();
        this.#forEachDepthFirst(first, visited, fn);
    }

    #forEachDepthFirst(node, visited, fn) {
        if (visited.has(node)) return;

        fn(node.value);

        visited.add(node);

        for (const edge of node.edges) {
            this.#forEachDepthFirst(edge.toNode, visited, fn);
        }
    }
}

const graph = new Graph();

graph.addNode('Atlanta');
graph.addNode('Boston');
graph.addNode('Chicago');
graph.addNode('Dallas');
graph.addNode('Denver');
graph.addNode('Los Angeles');
graph.addNode('New York');
graph.addNode('Portland');
graph.addNode('San Francisco');
graph.addNode('Seattle');

graph.addEdge('Atlanta', 'Chicago', 599);
graph.addEdge('Atlanta', 'Dallas', 725);
graph.addEdge('Atlanta', 'New York', 756);
graph.addEdge('Boston', 'New York', 191);
graph.addEdge('Boston', 'Seattle', 2489);
graph.addEdge('Chicago', 'Denver', 907);
graph.addEdge('Dallas', 'Denver', 650);
graph.addEdge('Dallas', 'Los Angeles', 1240);
graph.addEdge('Dallas', 'San Francisco', 1468);
graph.addEdge('Denver', 'San Francisco', 954);
graph.addEdge('Portland', 'Seattle', 130);
graph.addEdge('Portland', 'San Francisco', 550);

console.log(graph.toString());

graph.forEachBreadthFirst(node => console.log(node));
console.log('');
graph.forEachDepthFirst(node => console.log(node));