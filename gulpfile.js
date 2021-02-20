'use strict'

const { src, dest, series, parallel, watch } = require('gulp');
const asciidoctor = require('@asciidoctor/gulp-asciidoctor');
const buffer = require('gulp-buffer');
const browserify = require('browserify');
const connect = require('gulp-connect');
const fs = require('fs-extra')
const log = require('gulplog');
const postcss = require('gulp-postcss');
const rename = require("gulp-rename");
const sourcemaps = require('gulp-sourcemaps');
const tap = require('gulp-tap');
const terser = require('gulp-terser');

const paths = {
    dist: 'build/dist/',
    web: 'build/web/'
};

const ASCIIDOC_ATTRIBUTES = [
    'icons=font',
    'iconfont-remote!',
    'idprefix',
    'idseparator=-',
    'docinfo',
    'sectanchors',
    'sectnums',
    'stylesdir=css',
    'stylesheet=spring.css',
    'docinfo=shared',
    'linkcss',
    'docinfodir='.concat(process.cwd(), '/build/dist')
]

function addHighlightjsJavascript() {
    return src('src/main/js/highlight.bundle.js', {read: false})
        .pipe(tap(function (file) {
            log.info('Processing highligh.js bundle ' + file.path);
            file.contents = browserify(file.path, {debug: true})
                .plugin('browser-pack-flat/plugin')
                .bundle();
        }))
        .pipe(rename('highlight.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(terser())
        .pipe(sourcemaps.write('./'))
        .pipe(dest('build/web/js'));
}

function addSiteCss() {
    return src(['src/main/css/spring.css', 'src/main/css/font-awesome.css'])
        .pipe(sourcemaps.init())
        .pipe(postcss())
        .pipe(sourcemaps.write('./'))
        .pipe(dest('build/web/css'));
}

function addImages() {
    return src('src/main/img/*')
        .pipe(dest('build/web/img'));
}

function addResources() {
    return src('src/main/docinfo/*')
        .pipe(dest('build/dist'));
}

function renderAsciidoctorExample() {
    return src('src/test/docs/asciidoc/index.adoc')
        .pipe(asciidoctor({
            safe: 'unsafe', 
            doctype: 'book', 
            attributes: ASCIIDOC_ATTRIBUTES
        }))
        .pipe(dest('build/web'))
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

const update = series(addResources, addHighlightjsJavascript, addSiteCss, addImages, renderAsciidoctorExample);

exports.ad = update
exports.dev = series(update, parallel(webServer, watchFiles));
exports.js = series(addHighlightjsJavascript, addSiteCss);
