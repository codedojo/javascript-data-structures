import expect from 'expect';

import Trie from './trie.js';

describe('Trie', () => {
    it('should work', () => {
        const trie = new Trie();

        trie.add('ace');
        trie.add('act');
        trie.add('action');

        expect(trie.getAllWords()).toEqual(['ace', 'act', 'action']);
        expect(trie.getSuggestions('a')).toEqual(['ce', 'ct', 'ction']);
    });
});