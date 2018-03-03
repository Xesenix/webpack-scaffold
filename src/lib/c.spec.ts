import { C } from './c';

describe('C', () => {
	it('should create', () => {
		const instance = new C();
		expect(instance).toBeTruthy();
	});

	describe('getName', () => {
		it('should return class name', () => {
			const instance = new C();

			expect(instance.getName()).toEqual('C');
		});
	});

	describe('tested', () => {
		it('should execute default code branch', () => {
			const spy = spyOn(console, 'log');
			const instance = new C();

			instance.tested();

			expect(spy).toHaveBeenCalledWith('Tested branch C.1');
		});
	});

	describe('generator', () => {
		it('should generate secret code sequence', () => {
			const instance = new C();
			const result: number[] = [];

			for (const val of instance.generator()) {
				result.push(val);
			}

			expect(result).toEqual([1, 3, 7]);
		});
	});
})
