import { C } from './c';

describe('C', () => {
	it('should create', () => {
		const instance = new C();
		expect(instance).toBeTruthy();
	});

	describe('execute', () => {
		it('should execute', () => {
			const spy = spyOn(console, 'log');
			const instance = new C();

			instance.execute();

			expect(spy).toHaveBeenCalledWith('Execute C');
		});
	});

	describe('generator', () => {
		it('should generate secret code sequence', () => {
			const instance = new C();
			const result = [];

			for (const val of instance.generator()) {
				result.push(val);
			}

			expect(result).toEqual([1, 3, 7]);
		});
	});
})
