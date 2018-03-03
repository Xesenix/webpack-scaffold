import { A } from './a';

describe('A', () => {
	it('should create', () => {
		const instance = new A();
		expect(instance).toBeTruthy();
	});

	describe('tested', () => {
		it('should execute tested default branch', () => {
			const spy = spyOn(console, 'log');
			const instance = new A();

			instance.tested();

			expect(spy).toHaveBeenCalledWith('Tested branch A.1');
		});

		it('should execute tested optional branch', () => {
			const spy = spyOn(console, 'log');
			const instance = new A();

			instance.tested(false);

			expect(spy).toHaveBeenCalledWith('Tested branch A.2');
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
