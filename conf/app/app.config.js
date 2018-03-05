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

	config.rootDir = getAppConfig('rootDir', 'src');
	config.outDir = getAppConfig('outDir', 'dist');
	config.main = getAppConfig('main', [ './main.js' ]);
	config.test = getAppConfig('test', 'test.js');
	config.assets = getAppConfig('assets', [ './assets' ]);
	config.fonts = getAppConfig('fonts', [ './fonts' ]);
	// list of entry point stylesheets
	config.styles = getAppConfig('styles', [ './styles/styles.scss' ]);
	// list of paths to directories on which to look for stylesheets when resolving @import in stylesheets
	config.stylesIncludePaths = getAppConfig('stylesIncludePaths', [ './styles' ]).map(p => path.join(config.rootDir, p));
	config.vendor = getAppConfig('vendor', []);
	config.template = getAppConfig('template', 'index.html');
	config.templateData = getAppConfig('templateData', {});
	config.languages = getAppConfig('languages', ['en']);

	config.rootPath = path.normalize(path.resolve(projectRoot, config.rootDir));
	config.outPath = path.normalize(path.resolve(projectRoot, config.outDir));

	return config;
}

module.exports = {
	getEnvApp,
	projectRoot,
	packageConfig,
	retrivePackageAppConfig,
	getAppConfig,
}
