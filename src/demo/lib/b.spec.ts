import { B } from './b';

describe('B', () => {
	it('should create', () => {
		const instance = new B();
		expect(instance).toBeTruthy();
	});

	describe('tested', () => {
		it('should execute', () => {
			const spy = spyOn(console, 'log');
			const instance = new B();

			instance.tested();

			expect(spy).toHaveBeenCalledWith('Tested B');
		});
	});
})
