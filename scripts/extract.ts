import { GettextExtractor, HtmlExtractors, JsExtractors } from 'gettext-extractor';
import * as chalk from 'chalk';
import * as mkdirp from 'mkdirp';
import * as path from 'path';

import { getAppConfig, getEnvApp } from 'xes-webpack-core';

const app = getEnvApp();
const config = getAppConfig(app);
const extractor = new GettextExtractor();

console.log(chalk.green('Extracting translation'));
console.log(chalk.grey('------------------------'));
console.log(`App: ${chalk.blue(app)}`);
console.log(`Searching for segments from: ${chalk.blue(config.rootDir)}`);

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

const localesDir = path.resolve(config.rootDir, config.localesDir);
const potPath = path.resolve(localesDir, './messages.pot');

// create locales directory if it doesn't exists
mkdirp.sync(localesDir);

// write extracted messages to locales/messages.pot
extractor.savePotFile(potPath);

extractor.printStats();
console.log(`Extracted translation segments added to: ${chalk.blue(potPath)}`);
