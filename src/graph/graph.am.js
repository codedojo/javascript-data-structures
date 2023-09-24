function createMatrix(size, defaultValue = 0) {
    return new Array(size).fill(defaultValue)
        .map(() => new Array(size).fill(defaultValue));
}

export default class Graph {
    #vertices = [];
    #matrix = [];
    #directed = false;

    get vertices() {
        return Array.from(this.#vertices);
    }

    get edges() {
        const edges = [];

        for (let i = 0; i < this.size; i++) {
            const vertex = this.#vertices[i];

            for (let j = 0; j < this.size; j++) {
                if (j === i) continue;

                const neighbor = this.#vertices[j];
                const value = this.#matrix[i][j];

                if (value > 0) {
                    edges.push(value > 1 ? // weighted
                        [vertex, neighbor, value] :
                        [vertex, neighbor]
                    );
                }
            }
        }

        return edges;
    }

    get size() {
        return this.#vertices.length;
    }

    get isDirected() {
        return this.#directed;
    }

    constructor(size = 0, directed = this.#directed) {
        this.#matrix = createMatrix(size);
        this.#directed = directed;
    }

    addVertex(vertex) {
        this.#vertices.push(vertex);
    }

    addEdge(v1, v2, weight = 1) {
        if (!this.#vertices.includes(v1)) {
            this.#vertices.push(v1);
        }

        if (!this.#vertices.includes(v2)) {
            this.#vertices.push(v2);
        }

        const i1 = this.#vertices.indexOf(v1);
        const i2 = this.#vertices.indexOf(v2);

        this.#matrix[i1][i2] = weight;

        if (!this.#directed) {
            this.#matrix[i2][i1] = weight;
        }
    }

    getAdjacentVertices(v) {
        const adjacentVertices = [];
        const i = this.#vertices.indexOf(v);

        for (let j = 0; j < this.size; j++) {
            if (this.#matrix[i][j] > 0) {
                adjacentVertices.push(this.#vertices[j]);
            }
        }

        return adjacentVertices;
    }

    getIndegree(v) {
        const i = this.#vertices.indexOf(v);
        let indegree = 0;

        for (const v of this.#matrix[i]) {
            if (v > 0) {
                indegree++;
            }
        }

        return indegree;
    }

    getEdgeWeight(v1, v2) {
        const i1 = this.#vertices.indexOf(v1);
        const i2 = this.#vertices.indexOf(v2);

        return this.#matrix[i1][i2];
    }

    forEachDepthFirst(fn, vertex = this.#vertices[0], visited = new Set()) {
        if (visited.has(vertex)) return;

        // Mark node as visited by adding it to the visited set:
        visited.add(vertex);

        // Call the fn with the node
        fn(vertex);

        // Iterate through the current node's neighbors:
        for (const adjacentVertex of this.getAdjacentVertices(vertex)) {
            // Recursively call this method on the adjacent node
            this.forEachDepthFirst(fn, adjacentVertex, visited);
        }
    }

    forEachBreadthFirst(fn) {
        const queue = [];
        const visited = new Set();
        const [first] = this.#vertices;

        queue.push(first);
        visited.add(first);

        while (queue.length > 0) {
            const vertex = queue.shift();

            if (visited.has(vertex)) continue;

            fn(vertex);

            visited.add(vertex);

            for (const adjacentVertex of this.getAdjacentVertices(vertex)) {
                if (visited.has(adjacentVertex)) continue;

                queue.push(adjacentVertex);
            }
        }
    }

    topologicalSort() {
        const queue = [];
        const indegreeMap = new Map();
        const sortedList = [];

        for (const vertex of this.#vertices) {
            indegreeMap.set(vertex, this.getIndegree(vertex));

            if (indegreeMap.get(vertex) === 0) {
                queue.push(vertex);
            }
        }

        while (queue.length > 0) {
            const vertex = queue.shift();
            sortedList.push(vertex);

            for (const v of this.getAdjacentVertices(vertex)) {
                indegreeMap.set(v, indegreeMap.get(v) - 1);

                if (indegreeMap.get(v) === 0) {
                    queue.push(v);
                }
            }
        }

        if (sortedList.length !== graph.size) {
            throw new Error('This graph has a cycle!');
        }

        return sortedList;
    }

    toString() {
        let string = '';

        for (const [node, neighbors] of this.#vertices) {
            string += node + ' -> ';

            for (const neighbor of neighbors) {
                string += neighbor + ' ';
            }

            string += '\n';
        }

        return string;
    }
}