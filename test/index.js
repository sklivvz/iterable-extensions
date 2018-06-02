'use strict';

var expect = require('chai').expect;
var numFormatter = require('../index');

describe('#Select', function() {
    it('should return the same object when passed the identity function', function() {
        var result = ['a','b','c'].Select(x=>x);
        expect(result.next().value).to.equal('a');
        expect(result.next().value).to.equal('b');
        expect(result.next().value).to.equal('c');
        expect(result.next().done).to.be.true;
    });
    it('should apply a function passed', function() {
        var result = [1,2,3].Select(x=>x*x);
        expect(result.next().value).to.equal(1);
        expect(result.next().value).to.equal(4);
        expect(result.next().value).to.equal(9);
        expect(result.next().done).to.be.true;
    });
});