export class C {
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
