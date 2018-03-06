const path = require('path');

const projectRoot = path.resolve('./');
const getEnvApp = () => process.env.APP || 'app';
const packageConfig = require(path.resolve(projectRoot, './package.json'));
const retrivePackageAppConfig = (app) => packageConfig.apps && packageConfig.apps[app]
	? (key, defaultValue) => packageConfig.apps[app][key] ? packageConfig.apps[app][key] : defaultValue
	: (key, defaultValue) => defaultValue;

const getAppConfig = (app) => {
	const getAppConfig = retrivePackageAppConfig(app);
	const config = {};
	const fixPathRegExp = /\\/g;

	config.rootDir = getAppConfig('rootDir', 'src').replace(fixPathRegExp, '/');
	config.moduleImportPaths = getAppConfig('moduleImportPaths', []).map(p => p.replace(fixPathRegExp, '/'));
	config.outDir = getAppConfig('outDir', 'dist').replace(fixPathRegExp, '/');
	config.main = getAppConfig('main', [ './main.js' ]).map(p => p.replace(fixPathRegExp, '/'));
	config.test = getAppConfig('test', 'main.test.js').replace(fixPathRegExp, '/');
	config.assets = getAppConfig('assets', [ './assets' ]).map(p => p.replace(fixPathRegExp, '/'));
	config.fonts = getAppConfig('fonts', [ './fonts' ]).map(p => p.replace(fixPathRegExp, '/'));
	// list of entry point stylesheets
	config.styles = getAppConfig('styles', [ 'styles/styles.scss' ]).map(p => p.replace(fixPathRegExp, '/'));
	// list of paths to directories on which to look for stylesheets when resolving @import in stylesheets
	config.stylesImportPaths = getAppConfig('stylesImportPaths', [ path.join(config.rootDir, './styles') ]).map(p => p.replace(fixPathRegExp, '/'));
	config.vendor = getAppConfig('vendor', []);
	config.template = getAppConfig('template', 'index.html').replace(fixPathRegExp, '/');
	config.templateData = getAppConfig('templateData', {});
	config.languages = getAppConfig('languages', [ 'en' ]);

	config.rootPath = path.normalize(path.resolve(projectRoot, config.rootDir));
	config.outPath = path.normalize(path.resolve(projectRoot, config.outDir));
	config.localesDir = getAppConfig('localesDir', 'locales').replace(fixPathRegExp, '/');

	return config;
}

module.exports = {
	getEnvApp,
	projectRoot,
	packageConfig,
	retrivePackageAppConfig,
	getAppConfig,
}
