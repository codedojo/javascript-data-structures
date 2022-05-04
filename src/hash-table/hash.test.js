import expect from 'expect';
import { ASCIIHash, SDBMHash, djb2 } from './hash.js';

describe('ASCIIHash', () => {
    it('produces collisions', () => {
        expect(ASCIIHash('foo')).toBe(324);
        expect(ASCIIHash('oof')).toBe(324);
        expect(ASCIIHash('ofo')).toBe(324);
    });
});

describe('SDBMHash', () => {
    it('generates unique hashes', () => {
        expect(SDBMHash('foo')).toBe(849955110);
        expect(SDBMHash('oof')).toBe(924308646);
        expect(SDBMHash('ofo')).toBe(923718264);
    });
});

describe('djb2', () => {
    it('generates unique hashes', () => {
        expect(djb2('foo')).toBe(193491849);
        expect(djb2('ofo')).toBe(193501353);
        expect(djb2('oof')).toBe(193501641);
    });
});