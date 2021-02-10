'use strict'

const { src, dest, series, parallel, watch } = require('gulp');
const asciidoctor = require('@asciidoctor/gulp-asciidoctor');
const browserify = require('browserify');
const connect = require('gulp-connect');
const log = require('gulplog');
const tap = require('gulp-tap');
const buffer = require('gulp-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const paths = {
    dist: 'build/dist/',
    web: 'build/web/'
};

const ASCIIDOC_ATTRIBUTES = [
    'icons=font',
    'idprefix',
    'idseparator=-',
    'docinfo',
    'sectanchors',
    'sectnums',
    'source-highlighter=highlight.js',
    'highlightjsdir=js/highlight',
    'highlightjs-theme=github',
    'stylesdir=css',
    'stylesheet=spring.css',
    'docinfo=shared',
    'linkcss',
    'docinfodir='.concat(process.cwd(), "/", paths.dist)
]

function js() {
    return src('src/main/js/*.js', {read: false})
        .pipe(tap(function (file) {
            log.info('bundling ' + file.path);
            file.contents = browserify(file.path, {debug: true}).bundle();
        }))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dest'));
}

function renderAsciidoctorExample() {
    return src('src/test/docs/asciidoc/index.adoc')
        .pipe(asciidoctor({
            safe: 'unsafe', 
            doctype: 'book', 
            attributes: ASCIIDOC_ATTRIBUTES
        }))
        .pipe(dest(paths.web))
        .pipe(connect.reload());
}

function webServer(cb) {
    connect.server({
        root: paths.web,
        livereload: true
    });
    cb();
}

function watchFiles(cb) {
    watch('src/**', update);
    cb();
}

const update = series(renderAsciidoctorExample);

exports.dev = series(update, parallel(webServer, watchFiles));
exports.js = js;
