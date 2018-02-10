# Webpack 3 scaffold project

![Run result](docs/images/screen-00.png)

## About

This is basic starting point for application using __webpack v3__ with some default configuration setup to properly load assets from diffrent locations.

### Workflow

Its work in progress so workflow is kind of clunky:

For development

* Run `npm run build:dev` this will move all assets to `package.app.outPath` path
* Run `npm run serve:dev` this will start `webpack-dev-server`

For production build:

* Run `npm run build:prod` this will move all assets to `package.app.outPath` path

### TODO

This project is using __webpack v3__ and probably has a lot place for improvement like:
* find a way to avoid need for using `$srcRoot` variable in stylesheet
* auto detect assets included in html template
* remove the need for building app before all assets are available for `webpack-dev-serve`

## Documentation

### Configuration via package.json 

You can provide application configuration via _package.json_ `app` param:

| __param__ | __default__ | __description__
| --- | --- | --- |
| __package.app.rootDir__ | src | directory where all source code and other assets resides
| __package.app.outDir__ | dist | directory in which to put builded application
| __package.app.main__ | ['main.js'] | entry points to your application relative to `package.app.rootDir`
| __package.app.assets__ | [] | all asset and resource you want to move to build assets directory
| __package.app.styles__ | [] | all stylesheets you want to use as entry point 
| __package.app.template__ | index.html | html template that you want to use as template for website
| __package.app.templateData__ | {} | html template is handled by ejs loader so you can put here additional data that will be passed to `htmlWebpackPlugin.options.data` you can also access _package.json_ from `htmlWebpackPlugin.options.package`
| __package.app.webpack__ | null | path to script that can extend basic webpack configuration function exported by this scrip recives 3 params: `env`, `webpackConfig`, `appConfig`

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
