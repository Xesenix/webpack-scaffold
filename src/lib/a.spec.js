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

			expect(spy).toHaveBeenCalledWith('Execute A');
		});
	});
})
