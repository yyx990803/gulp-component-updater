# Gulp Component.json Updater

> Gulp-friendly module to auto add/delete files in your component.json

In a large project in can be annoying to manually add every new file created to `component.json`. This module can be used with [Gulp](http://gulpjs.com) to automatically add/remove files from your `component.json`.

## Install

``` bash
$ npm install component-json-updater --save-dev
```

## Usage

``` js
var gulp = require('gulp'),
    updater = require('gulp-component-updater')

gulp.task('watch', function () {
    gulp.watch(
        ['component.json', 'src/**/*'],
        updater({ log: true })
    )
})
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