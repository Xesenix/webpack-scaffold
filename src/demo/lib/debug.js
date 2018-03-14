export function benchmark() {
	if (!process.env.DEBUG) {
		return () => ({});
	}
	console.debug('annotation:benchmark');
	return (target, key, descriptor) => {
		console.debug('annotation:benchmark:init', target);
		const base = descriptor.value;
		const name = 'benchmark-' + key;
		descriptor.value = function(...args) {
			console.time(name);
			base.apply(this, args);
			console.timeEnd(name);
		};
	}
}

export function groupLog(value) {
	if (!process.env.DEBUG) {
		return () => ({});
	}
	console.debug('annotation:groupLog', value);
	return (target, key, descriptor) => {
		console.debug('annotation:groupLog:init', value, target);
		const base = descriptor.value;
		descriptor.value = function(...args) {
			const name = `call: ${value}.${key}(${args.join(', ')})`;
			console.group(name);
			base.apply(this, args);
			console.groupEnd(name);
		};
	}
}
