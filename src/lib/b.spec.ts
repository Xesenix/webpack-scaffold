import { B } from './b';

describe('B', () => {
	it('should create', () => {
		const instance = new B();
		expect(instance).toBeTruthy();
	});

	describe('execute', () => {
		it('should execute', () => {
			const spy = spyOn(console, 'log');
			const instance = new B();

			instance.execute();

			expect(spy).toHaveBeenCalledWith('Execute B');
		});
	});
})
