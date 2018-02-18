import { A } from './a';

describe('A', () => {
	it('should create', () => {
		const instance = new A();
		expect(instance).toBeTruthy();
	});

	describe('execute', () => {
		it('should execute', () => {
			const spy = spyOn(console, 'log');
			const instance = new A();

			instance.execute();

			expect(spy).toHaveBeenCalledWith('Execute A.1');
		});

		it('should execute', () => {
			const spy = spyOn(console, 'log');
			const instance = new A();

			instance.execute(false);

			expect(spy).toHaveBeenCalledWith('Execute A.2');
		});
	});

	describe('generator', () => {
		it('should generate secret code sequence', () => {
			const instance = new A();
			const result = [];

			for (const val of instance.generator()) {
				result.push(val);
			}

			expect(result).toEqual([1, 3, 7]);
		});
	});
})
