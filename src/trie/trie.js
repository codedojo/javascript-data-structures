export default class Trie {
    #root = new Map();

    add(word) {
        let current = this.#root;

        for (const char of word) {
            if (current.has(char)) {
                current = current.get(char);
            } else {
                current.set(char, new Map());
                current = current.get(char);
            }
        }

        current.set('*', null);
    }

    search(word) {
        let current = this.#root;

        for (const char of word) {
            if (current.has(char)) {
                current = current.get(char);
            } else {
                return null;
            }
        }

        return current;
    }

    getAllWords(ch, word = '', words = []) {
        let current = ch || this.#root;

        for (const [key, value] of current.entries()) {
            if (key === '*') {
                words.push(word);
            } else {
                this.getAllWords(value, word + key, words);
            }
        }

        return words;
    }

    getSuggestions(prefix) {
        let current = this.search(prefix);

        if (!current) return null;

        return this.getAllWords(current);
    }
}



const trie1 = {
    a: {
        c: {
            e: {
                '*': null
            },
            t: {
                '*': null
            }
        }
    },
    b: {
        a: {
            d: {
                '*': null
            },
            k: {
                '*': null,
                e: {
                    '*': null
                }
            },
            t: {
                '*': null,
                t: {
                    e: {
                        r: {
                            '*': null
                        }
                    }
                }
            }
        }
    },
    c: {
        a: {
            b: {
                '*': null
            },
            t: {
                '*': null,
                n: {
                    a: {
                        p: {
                            '*': null
                        }
                    },
                    i: {
                        p: {
                            '*': null
                        }
                    }
                }
            }
        }
    }
};