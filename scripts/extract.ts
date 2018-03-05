import { GettextExtractor, HtmlExtractors, JsExtractors } from 'gettext-extractor';
import { mkdirp } from 'mkdirp';
import * as path from 'path';

import { getAppConfig, getEnvApp } from '../conf/app/app.config';

const app = getEnvApp();
const config = getAppConfig(app);
const extractor = new GettextExtractor();

// handle __('Segment to extract')
extractor
	.createJsParser([
		JsExtractors.callExpression('__', {
			arguments: {
				text: 0,
				context: 1,
			},
		}),
		JsExtractors.callExpression('_p', {
			arguments: {
				text: 1,
				textPlural: 2,
				context: 3,
			},
		}),
	])
	.parseFilesGlob(path.join(config.rootDir, './**/*.@(ts|js|tsx|jsx)'), {
		ignore: '**/*.spec.*'
	});

// handle <p translate>Segment to extract</p>
extractor
	.createHtmlParser([
		HtmlExtractors.elementContent('translate, [translate]'),
	])
	.parseFilesGlob(path.join(config.rootDir, './**/*.html'));

// create locales directory if it doesn't exists
mkdirp.sync(path.join(config.rootDir, './locales/'));

// write extracted messages to locales/messages.pot
extractor.savePotFile(path.resolve(config.rootDir, './locales/messages.pot'));

extractor.printStats();
