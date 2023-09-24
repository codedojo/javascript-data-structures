import expect from 'expect';

import Graph from './graph.am.js';
import { shortestPath, shortestPathDijkstra, prim } from './algorithms.js';

xdescribe('Shortest path', () => {
    it('it works for undirected graph', () => {
        const graph = new Graph(8);

        graph.addEdge(0, 1);
        graph.addEdge(1, 2);
        graph.addEdge(1, 3);
        graph.addEdge(2, 3);
        graph.addEdge(1, 4);
        graph.addEdge(3, 5);
        graph.addEdge(5, 4);
        graph.addEdge(3, 6);
        graph.addEdge(6, 7);
        graph.addEdge(0, 7);

        expect(shortestPath(graph, 0, 5)).toEqual([0, 1, 3, 5]);
        expect(shortestPath(graph, 0, 6)).toEqual([0, 7, 6]);
        expect(shortestPath(graph, 7, 4)).toEqual([7, 0, 1, 4]);
    });

    it('it works for directed graph', () => {
        const graph = new Graph(8, true);

        graph.addEdge(0, 1);
        graph.addEdge(1, 2);
        graph.addEdge(1, 3);
        graph.addEdge(2, 3);
        graph.addEdge(1, 4);
        graph.addEdge(3, 5);
        graph.addEdge(5, 4);
        graph.addEdge(3, 6);
        graph.addEdge(6, 7);
        graph.addEdge(0, 7);

        expect(shortestPath(graph, 0, 5)).toEqual([0, 1, 3, 5]);
        expect(shortestPath(graph, 0, 6)).toEqual([0, 1, 3, 6]);
        expect(shortestPath(graph, 7, 4)).toEqual([]);
    });
});

xdescribe('Dijkstra\'s shortest path', () => {
    it('works', () => {
        const graph = new Graph(5);

        graph.addEdge('Atlanta', 'Boston', 100);
        graph.addEdge('Atlanta', 'Denver', 160);
        graph.addEdge('Boston', 'Chicago', 120);
        graph.addEdge('Boston', 'Denver', 180);
        graph.addEdge('Chicago', 'El Paso', 80);
        graph.addEdge('Denver', 'Chicago', 40);
        graph.addEdge('Denver', 'El Paso', 140);

        expect(shortestPathDijkstra(graph, 'Atlanta', 'El Paso')).toEqual([
            'Atlanta',
            'Denver',
            'Chicago',
            'El Paso'
        ]);
    });

    it('it works for undirected graph', () => {
        const graph = new Graph(8);

        graph.addEdge(0, 1, 1);
        graph.addEdge(1, 2, 2);
        graph.addEdge(1, 3, 6);
        graph.addEdge(2, 3, 2);
        graph.addEdge(1, 4, 3);
        graph.addEdge(3, 5, 1);
        graph.addEdge(5, 4, 5);
        graph.addEdge(3, 6, 1);
        graph.addEdge(6, 7, 1);
        graph.addEdge(0, 7, 8);

        expect(shortestPathDijkstra(graph, 0, 6)).toEqual([0, 1, 2, 3, 6]);
        expect(shortestPathDijkstra(graph, 4, 7)).toEqual([4, 5, 3, 6, 7]);
        expect(shortestPathDijkstra(graph, 7, 0)).toEqual([7, 6, 3, 2, 1, 0]);
    });

    it('it works for directed graph', () => {
        const graph = new Graph(8, true);

        graph.addEdge(0, 1, 1);
        graph.addEdge(1, 2, 2);
        graph.addEdge(1, 3, 6);
        graph.addEdge(2, 3, 2);
        graph.addEdge(1, 4, 3);
        graph.addEdge(3, 5, 1);
        graph.addEdge(5, 4, 5);
        graph.addEdge(3, 6, 1);
        graph.addEdge(6, 7, 1);
        graph.addEdge(0, 7, 8);

        expect(shortestPathDijkstra(graph, 0, 6)).toEqual([0, 1, 2, 3, 6]);
        expect(shortestPathDijkstra(graph, 4, 7)).toEqual([]);
        expect(shortestPathDijkstra(graph, 7, 0)).toEqual([]);
    });
});

describe('Prim\'s Minimal Spanning Tree', () => {
    it('works', () => {
        const graph = new Graph(8);

        graph.addEdge(0, 1, 1);
        graph.addEdge(1, 2, 2);
        graph.addEdge(1, 3, 2);
        graph.addEdge(2, 3, 2);
        graph.addEdge(1, 4, 3);
        graph.addEdge(3, 5, 1);
        graph.addEdge(5, 4, 3);
        graph.addEdge(3, 6, 1);
        graph.addEdge(6, 7, 1);
        graph.addEdge(7, 0, 1);

        /**
         * 6 -> 3
         * 0 -> 7
         * 1 -> 4
         * 1 -> 0
         * 1 -> 2
         * 7 -> 6
         * 3 -> 5
         */
        console.log(prim(graph, 1));
        //expect(prim(graph, 1)).toEqual([]);

        /**
         * 6 -> 7
         * 7 -> 0
         * 3 -> 6
         * 5 -> 4
         * 0 -> 1
         * 3 -> 5
         * 3 -> 2
         */
        //expect(prim(graph, 3)).toEqual([]);
        console.log(prim(graph, 3));
    });
});

describe('Kruskal\'s Minimal Spanning Tree', () => {
    it('works', () => {
        const graph = new Graph(8);

        graph.addEdge(0, 1, 1);
        graph.addEdge(1, 2, 2);
        graph.addEdge(1, 3, 2);
        graph.addEdge(2, 3, 2);
        graph.addEdge(1, 4, 3);
        graph.addEdge(3, 5, 1);
        graph.addEdge(5, 4, 2);
        graph.addEdge(3, 6, 1);
        graph.addEdge(6, 7, 1);
        graph.addEdge(7, 0, 1);

        /**
         * 0 -> 1
         * 0 -> 7
         * 1 -> 2
         * 3 -> 5
         * 3 -> 6
         * 4 -> 5
         * 6 -> 7
         */
        console.log(prim(graph, 1));
        //expect(prim(graph, 1)).toEqual([]);
    });
});