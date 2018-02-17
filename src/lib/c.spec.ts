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
})
