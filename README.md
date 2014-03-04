# Gulp Component.json Updater

> Gulp-friendly module to auto add/delete files in your component.json

## Install

``` bash
$ npm install component-json-updater --save-dev
```

## Usage

This module is [Gulp](http://gulpjs.com) friendly:

``` js
var gulp = require('gulp'),
    updater = require('gulp-component-updater')

gulp.watch(
    ['component.json', 'src/**/*'],
    updater()
)
```

## API

### updater([component.json path], [options])

#### Component.json path

Optional. Defaults to `component.json`

#### Options

Optional. Default options:

``` js
{
    styles: ['css', 'styl', 'sass', 'less'],
    scripts: ['js', 'coffee'],
    templates: ['html', 'jade', 'mustache', 'handlebars'],
    images: ['jpg', 'png', 'gif'],
    files: [],
    log: false, // console.log file changes
    indent: 2 // indent spaces in component.json
}
```