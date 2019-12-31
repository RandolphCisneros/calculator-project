const calculatorScript = require('./testableScript.js');

describe('add', function() {
	it('adds 0 and 0', function() {
		expect(calculatorScript.add(0,0)).toEqual(0);
	});

	it('adds 2 and 2', function() {
		expect(calculatorScript.add(2,2)).toEqual(4);
	});

	it('adds positive numbers', function() {
		expect(calculatorScript.add(2,6)).toEqual(8);
	});
});

describe('operate', function() {
	it('operates with add(1,1)', function() {
		expect(calculatorScript.operate('+', 1, 1)).toEqual(2);
	});
});