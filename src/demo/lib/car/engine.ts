import { IAttachablePart } from './car';
import { benchmark, groupLog } from 'demo/lib/debug';
import { injectable } from 'lib/di';

export @injectable() class Engine implements IAttachablePart {
	@groupLog('A')
	@benchmark()
	attach(parent) {
		console.log(`attached engine to ${parent}`);
	}
}
