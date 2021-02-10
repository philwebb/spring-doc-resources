'use strict'

const { src, dest, series, parallel, watch } = require('gulp');
const asciidoctor = require('@asciidoctor/gulp-asciidoctor');
const connect = require('gulp-connect');

const paths = {
    dist: 'build/dist/',
    web: 'build/web/'
};

const asciidoctorAttributes = [
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

function renderAsciidoctorExample() {
    return src('src/test/docs/asciidoc/index.adoc')
        .pipe(asciidoctor({
            safe: 'unsafe', 
            doctype: 'book', 
            attributes: asciidoctorAttributes
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
