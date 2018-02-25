[![Build Status](https://travis-ci.org/Xesenix/webpack-3-scaffold.svg?branch=master)](https://travis-ci.org/Xesenix/webpack-3-scaffold)
[![Appveyor Windows Build Status](https://ci.appveyor.com/api/projects/status/github/xesenix/webpack-3-scaffold?svg=true)](https://ci.appveyor.com/project/xesenix/webpack-3-scaffold)
[![Coverage Status](https://coveralls.io/repos/github/Xesenix/webpack-3-scaffold/badge.svg?branch=master)](https://coveralls.io/github/Xesenix/webpack-3-scaffold?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/Xesenix/webpack-3-scaffold/badge.svg?targetFile=package.json)](https://snyk.io/test/github/xesenix/webpack-3-scaffold?targetFile=package.json)
[![Dependencies Status](https://david-dm.org/Xesenix/webpack-3-scaffold/status.svg)](https://david-dm.org/Xesenix/webpack-3-scaffold)

![Required node version >= 8.0.0](https://img.shields.io/badge/required%20node-%3E%3D%208.0.0-brightgreen.svg)

# Webpack 3 scaffold project

[![Demo application](docs/images/screen-00.png)](https://webpack-3-scaffold.herokuapp.com/)

## DEMO

Check live [demo](https://webpack-3-scaffold.herokuapp.com) of running this scaffold.

## About

This is basic starting point for application using __webpack v3__ with some default configuration setup to properly load assets from diffrent locations.

### Workflow

Its work in progress so workflow is kind of clunky:

For development with HMR

* Run `npm run build:dev` this will copy vendor assets to local folder where from they can be served (if some assets are missing during development run this)
* Run `npm run serve:dev` this will start `webpack-dev-server` if some assets won't appear you probably need to add them to `package.app.assets`

For production build:

* Run `npm run build:prod` this will build project and move all assets to `package.app.outPath` path
* Run `npm start` to test build in browser `localhost:8080`

If you want analyze build size and dependencies use:

* Run `npm run analyze`

### Features

* setting up build specific environmental variables
* SASS
* HMR for stylesheets
* loading png, jpg, gif, svg assets from local project paths and node_modules
* loading eot, svg, ttf, woff, woff2 fonts from local project paths and node_modules

### TODO

This project is using __webpack v3__ and probably has a lot place for improvement like:
* find a way to avoid need for using `$srcRoot` variable in stylesheet
* auto detect assets included in html template (this is problem if you override default behaviour of copying to production all assets)

## Documentation

### Configuration via package.json 

You can provide application configuration via _package.json_ `app` param:

| __param__ | __default__ | __description__
| --- | --- | --- |
| __package.app.rootDir__ | src | directory where all source code and other assets resides
| __package.app.outDir__ | dist | directory in which to put builded application
| __package.app.main__ | ['main.js'] | entry points to your application relative to `package.app.rootDir`
| __package.app.assets__ | ['assets'] | all asset and resource you want to move to build assets directory (you can use glob patterns or just link to directory)
| __package.app.fonts__ | ['fonts'] | all fonts resource you want to move to build fonts directory (you can use glob patterns or just link to directory)
| __package.app.styles__ | ['styles/styles.scss'] | all stylesheets you want to use as entry points
| __package.app.stylesIncludePaths__ | ['./styles'] | list of relative path on which to look for included stylesheet via `@import`
| __package.app.vendor__ | [] | all vendor scripts you want to push to vendor bundle
| __package.app.template__ | index.html | html template that you want to use as template for website
| __package.app.templateData__ | {} | html template is handled by ejs loader so you can put here additional data that will be passed to `htmlWebpackPlugin.options.data` you can also access _package.json_ from `htmlWebpackPlugin.options.packageConfig`
| __package.app.webpack__ | null | path to script that can extend basic webpack configuration function exported by this scrip recives 3 params: `env`, `webpackConfig`, `appConfig`

### Source code phrase replacement

If anywhere in you code exist one of those phrases it will be replaced with data injected via __webpack.DefinePlugin__

| __phrase__ | __type__ | __default__ | __meaning__ |
|---|---|---|---|
| __process.env.DEVELOPMENT__ | _boolean_ | | project was build with development flag `--env.dev` |
| __process.env.PRODUCTION__ | _boolean_ | | project was build with production flag `--env.prod` |
| __process.env.PACKAGE__ | _object_ | | contents of _package.json_ |
| __process.env.APP__ | _object_ | | application build configuration resolved from build context |
| __process.env.APP.rootDir__ | string | _src_ | `package.app.rootDir` |
| __process.env.APP.outDir__ | string | _dist_ | `package.app.outDir` |
| __process.env.APP.rootPath__ | string | | resolved system path to `package.app.rootDir` |
| __process.env.APP.outPath__ | string | | resolved system path to `package.app.outDir` |
| __process.env.APP.main__ | string[] | | application entry scripts defined in `package.app.main` |
| __process.env.APP.assets__ | string[] | | assets defined in `package.app.assets` |
| __process.env.APP.fonts__ | string[] | ['./fonts'] | fonts defined in `package.app.fonts` |
| __process.env.APP.styles__ | string[] | ['./styles/styles.scss'] | styles entry points defined in `package.app.styles` |
| __process.env.APP.stylesIncludePaths__ | string[] | ['./styles'] | styles lookup paths `package.app.stylesIncludePaths` |
| __process.env.APP.vendor__ | string[] | | vendor scripts defined in `package.app.vendor` |
| __process.env.APP.template__ | string | _index.html_ | main template name |
| __process.env.APP.templateData__ | string | | data injected into template `htmlWebpackPlugin.options.data` |
| __process.env.APP.appWebpackPath__ | string | | path to additional webpack configuration script |

__process.env__ won't have those phrases listed as its params when trying to call it after build. So it secure, in sense that you can use only what you really need.

### Additional environmental configuration via _.env_ file

If you need to add any secret configuration to your project you can use similar proccess of replacing source code as above with variables provided in _.env_ file.
For example:

_file: .env_

```env
SOME_SECRET=secret value
```

and then anywhere in javascript you can use it like this:

_file: src/some/script/path/script.js_
```javascript
const secret = process.env.SOME_SECRET;
```

_.env_ file should be excluded from you repository via _.gitignore_.

## Examples

### Example stylesheet assets loading

Loading assets from stylesheet depends on entry point stylesheet used to generate url for that asset.
So if you use as entry point stylesheet that is one folder deep relative to your `package.app.rootDir` you need to compensate that path. So you can for example use structure like this:

for example:

_file: package.json_

```json
{
  "app": {
    "rootDir": "src",
    "styles": ["styles/subdir/entry-stylesheet.scss"]
  }
}
```
so for entry point stylesheet we have 2 level deep entry point `styles/subdir/` so then for:

_file: src/__styles/subdir/entry-stylesheet.scss___

```scss
/**
 * For setting up assets paths for imported style sheets 
 * this file lays two directories under src folder
 */
$srcRoot: '../../' !default;
/* We import any other stylesheet that uses $srcRoot after setting up $srcRoot */
@import 'some/other/path/stylesheet';

.some-selector {
  /* Use this kind of path interpolation for getting image preview in Visual Code */
  background-image: url(#{$srcRoot + 'assets/path/to/img/a.png'});
}
```

_file: src/styles/__some/other/path/stylesheet__.scss_

```scss
/**
 * If this stylesheet would be entry point it would use that default setting
 * this stylesheet lies 4 directories deep relative to src folder
 */
$srcRoot: '../../../../' !default;

.some-other-selector {
  /* Use this kind of path interpolation for getting image preview in Visual Code */
  background-image: url(#{$srcRoot + 'assets/path/to/img/b.png'});
}
```

### Example template referenced assets loading

For asset referenced in `index.html` we need to put all referenced assets into `package.app.assets` param.

So for example if you have:

_file: src/index.html_
```html
<html>
  <head>
    <link rel="icon" href="assets/path/to/image.png">
  </head>
  <body>
    <img src="assets/path/to/svg.svg"/>
  </body>
</html>
```

You need to setup something like this:

_file: package.json_

```json
{
  "app": {
    "root": "src",
    "template": "index.html",
    "assets": [
      "assets/path/to/image.png",
      "assets/path/to/svg.svg"
    ],
  }
}
```

# Resources

Some additional resources that can clarify concepts behind this scaffold project.

* [Webpack plugins documentation](https://webpack.js.org/plugins/)
* [List of webpack plugins](https://github.com/webpack-contrib/awesome-webpack)
* [Babel 7 and TypeScript](http://artsy.github.io/blog/2017/11/27/Babel-7-and-TypeScript/)
* [React Router](https://reacttraining.com/react-router/web/api/BrowserRouter)
* [React testing with Karma](https://www.codementor.io/kimagure/testing-reactjs-components-with-karma-and-webpack-8sdzi6hkf)
* [Istanbul Test Coverage](https://github.com/webpack-contrib/istanbul-instrumenter-loader)
* [Testing React with Enzyme](https://github.com/airbnb/enzyme/tree/master/packages/enzyme-adapter-react-16)
* [Authentication with PassportJs](http://www.passportjs.org/docs)

## Project managment related resources
* [Travis CLI installation](https://github.com/travis-ci/travis.rb#installation)
* [Setup Travis Heroku build](https://docs.travis-ci.com/user/deployment/heroku/)
* [Continous Integration Travis](https://docs.travis-ci.com)
* [Continous Integration for Windows with Appveyor](https://www.appveyor.com/docs/)
* [Badges](https://shields.io/)

