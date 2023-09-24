class StaticArray {
    #length;

    get length() {
        return this.#length;
    }

    constructor(length = 0) {
        if (typeof length !== 'number' || length < 0) {
            throw new Error('Length must be a positive integer');
        }

        this.#length = Math.trunc(length);

        return new Proxy(this, {
            get(target, name) {
                if (name === 'toString') {
                    return target.toString.bind(target);
                }

                return target[name];
            },

            set(target, key, value) {
                const index = Number.parseInt(key);

                if (isNaN(index)) {
                    throw new Error('Index must be a number');
                }

                if (index < 0 || index >= target.#length) {
                    throw new Error('Index is out of bounds');
                }

                target[index] = value;

                return true;
            }
        });
    }

    toString(separator = ',') {
        let result = '[';

        for (let i = 0; i < this.#length; i++) {
            result += this[i] || '';

            if (i < this.#length - 1) {
                result += separator;
            }
        }

        result += ']';

        return result;
    }
}

const array = new StaticArray(10);

console.log(array);

array[0] = 42;
array[9] = 24;

console.log(array[0]);
console.log(array.length);
console.log(array.toString(', '));