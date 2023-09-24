class Graph {
    nodes = new Map();
    directed = false;

    constructor(directed = this.directed) {
        this.directed = directed;
    }

    addNode(value) {
        if (this.nodes.has(value)) return;

        this.nodes.set(value, new Set());
    }

    addEdge(node1, node2) {
        this.nodes.get(node1)?.add(node2);

        if (!this.directed) {
            this.nodes.get(node2)?.add(node1);
        }
    }

    forEachDepthFirst(fn, node = Array.from(this.nodes.keys()).at(0), visited = new Set()) {
        if (visited.has(node)) return;

        fn(node);

        visited.add(node);

        for (const neighbor of this.nodes.get(node)) {
            if (visited.has(neighbor)) continue;

            this.forEachDepthFirst(fn, neighbor, visited);
        }
    }

    forEachBreadthFirst(fn) {
        const queue = [];
        const visited = new Set();
        const [first] = this.nodes.keys();

        queue.push(first);

        while (queue.length > 0) {
            const node = queue.shift();

            if (visited.has(node)) continue;

            fn(node);

            visited.add(node);

            for (const neighbor of this.nodes.get(node)) {
                if (visited.has(neighbor)) continue;

                queue.push(neighbor);
            }
        }
    }

    toString() {
        let string = '';

        for (const [node, neighbors] of this.nodes) {
            string += node + ' -> ';

            for (const neighbor of neighbors) {
                string += neighbor + ' ';
            }

            string += '\n';
        }

        return string;
    }
}

const graph = new Graph();

graph.addNode('Alice');
graph.addNode('Bob');
graph.addNode('Cynthia');

graph.addEdge('Alice', 'Bob');
graph.addEdge('Alice', 'Cynthia');
graph.addEdge('Bob', 'Cynthia');
graph.addEdge('Cynthia', 'Bob');

console.log(graph);

console.log(graph.toString());

graph.forEachDepthFirst(node => console.log('Visited:', node));

graph.forEachBreadthFirst(node => console.log('Visited:', node));