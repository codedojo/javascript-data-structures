import Queue from '../queue/index.js';
import Stack from '../stack/index.js';

export function shortestPath(graph, startVertex, endVertex) {
    const queue = new Queue();
    const distances = new Map();
    const predecessors = new Map();

    distances.set(startVertex, 0);
    predecessors.set(startVertex, startVertex);
    queue.enqueue(startVertex);

    while (!queue.empty) {
        const currentVertex = queue.dequeue();
        const distanceToCurrentVertex = distances.get(currentVertex);
        const adjacentVertices = graph.getAdjacentVertices(currentVertex);

        for (const adjacentVertex of adjacentVertices) {
            if (distances.has(adjacentVertex)) continue;

            distances.set(adjacentVertex, distanceToCurrentVertex + 1);
            predecessors.set(adjacentVertex, currentVertex);

            if (graph.getAdjacentVertices(adjacentVertex).length > 0) {
                queue.enqueue(adjacentVertex);
            }
        }
    }

    const path = new Stack();

    path.push(endVertex);

    let previousVertex = predecessors.get(endVertex);

    while (previousVertex != undefined && previousVertex !== startVertex) {
        path.push(previousVertex);
        previousVertex = predecessors.get(previousVertex);
    }

    if (previousVertex == undefined) {
        // no path from src to dest
        return [];
    } else {
        path.push(startVertex);
    }

    return Array.from(path);
}

/**
 * Dijkstra's algorithm is a greedy algorithm to calculate the shortest path between a vertex and all the other vertices.
 */
export function shortestPathDijkstra(graph, startVertex, endVertex) {
    const distances = new Map();
    const predecessors = new Map();
    const visited = new Set();

    distances.set(startVertex, 0);
    predecessors.set(startVertex, startVertex);

    let currentVertex = startVertex;

    /**
     * Visited: 'Atlanta', 'Boston', 'Denver', 'Chicago'
     */

    /**
     * Distances:
     * {
     *   'Atlanta': 0,
     *   'Boston': 100,
     *   'Denver': 160,
     *   'Chicago': 200,
     *   'El Paso': 280
     * }
    */

    /**
     * Predecessors:
     * {
     *   'Atlanta': 'Atlanta',
     *   'Boston': 'Atlanta',
     *   'Denver': 'Atlanta',
     *   'Chicago': 'Denver',
     *   'El Paso': 'Chicago'
     * }
    */

    while (currentVertex !== undefined) {
        visited.add(currentVertex);

        const distanceToCurrentVertex = distances.get(currentVertex); // the distance to the current vertex from the source
        const adjacentVertices = graph.getAdjacentVertices(currentVertex);

        for (const adjacentVertex of adjacentVertices) {
            const savedDistanceToAdjacentVertex = distances.get(adjacentVertex);
            const edgeWeight = graph.getEdgeWeight(currentVertex, adjacentVertex);
            const newDistanceToAdjacentVertex = distanceToCurrentVertex + edgeWeight;

            if (
                savedDistanceToAdjacentVertex === undefined || // we haven't saved the distance to this vertex
                newDistanceToAdjacentVertex < savedDistanceToAdjacentVertex // we have found a "cheaper" path to this vertex
            ) {
                distances.set(adjacentVertex, newDistanceToAdjacentVertex);
                predecessors.set(adjacentVertex, currentVertex);
            }
        }

        currentVertex = getMinDistanceVertex(distances, visited); // or dequeue the vertex with smallest weight with a priority queue
    }

    const path = new Stack();

    path.push(endVertex);

    let previousVertex = predecessors.get(endVertex);

    while (previousVertex !== undefined && previousVertex !== startVertex) {
        path.push(previousVertex);
        previousVertex = predecessors.get(previousVertex);
    }

    if (previousVertex === undefined) { // no path from src to dest
        return [];
    } else {
        path.push(startVertex);
    }

    return Array.from(path);
}

function getMinDistanceVertex(distances, visited) {
    let minDistance = Infinity;
    let minVertex;

    for (const [vertex, distance] of distances) {
        if (!visited.has(vertex) && distance <= minDistance) {
            minDistance = distance;
            minVertex = vertex;
        }
    }

    return minVertex;
}

/**
 * Prim's algorithm is a **greedy** algorithm to find a minimal spanning tree for a **weighted undirected** graph.
 */
export function prim(graph, startVertex) {
    const distances = new Map();
    const predecessors = new Map();
    const visited = new Set();

    distances.set(startVertex, 0);

    let currentVertex = startVertex;

    while (currentVertex !== undefined) {
        const adjacentVertices = graph.getAdjacentVertices(currentVertex);

        for (const adjacentVertex of adjacentVertices) {
            if (visited.has(adjacentVertex)) continue;

            const savedDistance = distances.get(adjacentVertex);
            const newDistance = graph.getEdgeWeight(currentVertex, adjacentVertex);

            if (savedDistance === undefined || savedDistance > newDistance
            ) {
                distances.set(adjacentVertex, newDistance);
                predecessors.set(adjacentVertex, currentVertex);
            }
        }

        visited.add(currentVertex);
        currentVertex = getMinDistanceVertex(distances, visited);
    }

    return Array.from(predecessors).map(([v1, v2]) => [v2, v1]);
}

/**
 * Kruskal's algorithm is a greedy algorithm to find a minimal spanning tree for a weighted undirected graph (the graph can be unconnected)
 * 1. Sort edges - increasing order of weight (can use a priority queue)
 * 2. Initialize empty result - empty set of edges (at end will hold minimum spanning tree)
 * 3. Find shortest edge - not currently in result (dequeue from priority queue)
 * 4. Reject if cycle introduced - else add to result set (this is a greedy step)
 * 5. Stop - when N - 1 edges in result (N = number of vertices in graph)
 */
function kruskal(graph) {
    const { length } = graph;
    const parent = [];
    let ne = 0;
    let a; let b; let u; let v;
    const cost = initializeCost(graph); // {1}

    while (ne < length - 1) { // {2}
        for (let i = 0, min = INF; i < length; i++) { // {3}
            for (let j = 0; j < length; j++) {
                if (cost[i][j] < min) {
                    min = cost[i][j];
                    a = u = i;
                    b = v = j;
                }
            }
        }
        u = find(u, parent); // {4}
        v = find(v, parent); // {5}
        if (union(u, v, parent)) { // {6}
            ne++;
        }
        cost[a][b] = cost[b][a] = INF; // {7}
    }
    return parent;
}

const find = (i, parent) => {
    while (parent[i]) {
        i = parent[i];
    }
    return i;
};

const union = (i, j, parent) => {
    if (i !== j) {
        parent[j] = i;
        return true;
    }
    return false;
};

/**
 * The Floyd-Warshall algorithm is a dynamic programming algorithm to calculate all the shortest paths on a graph.
 */
function floydWarshall(graph) {
    const dist = [];
    const { length } = graph;

    for (let i = 0; i < length; i++) { // {1}
        dist[i] = [];
        for (let j = 0; j < length; j++) {
            if (i === j) {
                dist[i][j] = 0; // {2}
            } else if (!isFinite(graph[i][j])) {
                dist[i][j] = Infinity; // {3}
            } else {
                dist[i][j] = graph[i][j]; // {4}
            }
        }
    }

    for (let k = 0; k < length; k++) { // {5}
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) { // {6}
                    dist[i][j] = dist[i][k] + dist[k][j]; // {7}
                }
            }
        }
    }

    return dist;
}