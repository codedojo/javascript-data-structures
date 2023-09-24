import expect from 'expect';

import GraphAM from './graph.am.js';

describe('Graph implemented with an adjacency matrix', () => {
    it('Undirected graph', () => {
        const graph = new GraphAM(3);

        graph.addVertex('Alice');
        graph.addVertex('Bob');
        graph.addVertex('Cynthia');

        graph.addEdge('Alice', 'Bob');
        graph.addEdge('Alice', 'Cynthia');
        graph.addEdge('Bob', 'Cynthia');

        expect(graph.size).toBe(3);
        expect(graph.vertices).toEqual(['Alice', 'Bob', 'Cynthia']);
        expect(graph.edges).toEqual([
            ['Alice', 'Bob'],
            ['Alice', 'Cynthia'],
            ['Bob', 'Alice'],
            ['Bob', 'Cynthia'],
            ['Cynthia', 'Alice'],
            ['Cynthia', 'Bob']
        ]);
    });

    it('Directed graph', () => {
        const graph = new GraphAM(3, true);

        graph.addVertex('Alice');
        graph.addVertex('Bob');
        graph.addVertex('Cynthia');

        graph.addEdge('Alice', 'Bob');
        graph.addEdge('Alice', 'Cynthia');
        graph.addEdge('Bob', 'Cynthia');

        expect(graph.size).toBe(3);
        expect(graph.vertices).toEqual(['Alice', 'Bob', 'Cynthia']);
        expect(graph.edges).toEqual([
            ['Alice', 'Bob'],
            ['Alice', 'Cynthia'],
            ['Bob', 'Cynthia']
        ]);
    });
});