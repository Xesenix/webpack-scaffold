export class C {
	private name: string = 'C';

	public getName(): string {
		return this.name;
	}
	public execute(): void {
		console.log('Execute C');
	}

	public notExecuted(): void {
		console.log('Not execute C');
	}

	public * generator(): IterableIterator<number> {
		yield 1;
		yield 3;
		yield 7;
	}
}
