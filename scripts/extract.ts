import { mkdirp } from 'mkdirp';
import { GettextExtractor, HtmlExtractors, JsExtractors } from 'gettext-extractor';

const extractor = new GettextExtractor();

// handle getText('Segment to extract')
extractor
	.createJsParser([
		JsExtractors.callExpression('getText', {
			arguments: {
				text: 0,
				context: 1,
			},
		}),
		JsExtractors.callExpression('getPlural', {
			arguments: {
				text: 1,
				textPlural: 2,
				context: 3,
			},
		}),
	])
	.parseFilesGlob('./src/**/*.@(ts|js|tsx|jsx)');

// handle <p translate>Segment to extract</p>
extractor
	.createHtmlParser([
		HtmlExtractors.elementContent('translate, [translate]'),
	])
	.parseFilesGlob('./src/**/*.html');

mkdirp.sync('./src/locales/');
extractor.savePotFile('./src/locales/messages.pot');

extractor.printStats();
