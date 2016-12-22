"use strict";

var concat = require('gulp-concat');
var gulp = require('gulp');
var gulps = require('gulp-series');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var rimraf = require('rimraf');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var typescript = require('gulp-typescript');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var webpack = require('gulp-webpack');

gulps.registerTasks({
    'clear-build-directory': task_clear_build_directory,
    'typescript': task_typescript,
    'sourcemaps': task_sourcemaps,
    'sass': task_sass,
    'bundle-js': task_bundle_js,
    'bundle-css': task_bundle_css,
    'uglify-js': task_uglify_js,
    'uglify-css': task_uglify_css,
    'html-dev': task_html_dev,
    'html-dist': task_html_dist,
    'inject-dev': task_inject_dev,
    'inject-dist': task_inject_dist
});

gulps.registerSeries('build', [
    'clear-build-directory',
    'typescript', 'sourcemaps', 'sass'
]);
gulps.registerSeries('build-dev', [
    'clear-build-directory',
    'typescript', 'sourcemaps', 'sass',
    'bundle-js', 'bundle-css',
    'html-dev', 'inject-dev'
]);
gulps.registerSeries('build-dist', [
    'clear-build-directory',
    'typescript', 'sourcemaps', 'sass',
    'bundle-js', 'bundle-css',
    'uglify-js', 'uglify-css',
    'html-dev', 'inject-dev',
    'html-dist', 'inject-dist'
]);

/************************************************************/
var paths = {};
paths.src = 'src/';
paths.build = 'build/';
paths.raw = paths.build + 'raw/';
paths.dev = paths.build + 'dev/';
paths.dist = paths.build + 'dist/';

/************************************************************/
function task_clear_build_directory(cb) {
    rimraf(paths.build + '*', cb);
}

/************************************************************/
function task_typescript(cb) {
    var tsp = typescript.createProject('tsconfig.json');
    return gulp
        .src(paths.src + '**/*.ts')
        .pipe(tsp())
        .pipe(gulp.dest(paths.raw));
}

/************************************************************/
function task_sourcemaps(cb) {
    return gulp
        .src(paths.raw + '**/*.js')
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.raw));
}

/************************************************************/
function task_sass(cb) {
    return gulp
        .src(paths.src + '**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.raw));
}

/************************************************************/
function task_bundle_js(cb) {
    var time = (new Date()).getTime();
    return gulp
        .src(paths.raw + 'index.js')
        .pipe(webpack({ output: { filename: time+'.js' }}))
        .pipe(gulp.dest(paths.dev));
}

/************************************************************/
function task_bundle_css(cb) {
    var time = (new Date()).getTime();
    return gulp
        .src(paths.raw + '**/*.css')
        .pipe(concat(time+'.css'))
        .pipe(gulp.dest(paths.dev));
}

/************************************************************/
function task_uglify_js(cb) {
    return gulp
        .src(paths.dev+'**/*.js')
        .pipe(uglify({ mangle: true, compress: true }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.dist));
}

/************************************************************/
function task_uglify_css(cb) {
    return gulp
        .src(paths.dev + '**/*.css')
        .pipe(uglifycss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.dist));
}

/************************************************************/
function task_html_dev(cb) {
    return gulp
        .src(paths.src + '**/*.html')
        .pipe(gulp.dest(paths.dev));
}

/************************************************************/
function task_html_dist(cb) {
    return gulp
        .src(paths.src + '**/*.html')
        .pipe(gulp.dest(paths.dist));
}

/************************************************************/
function task_inject_dev(cb) {
    var sources = gulp.src([ paths.dev + '**/*.js', paths.dev + '**/*.css' ])

    return gulp
        .src(paths.dev + 'index.html')
        .pipe(inject(sources, { relative: true }))
        .pipe(gulp.dest(paths.dev));
}

/************************************************************/
function task_inject_dist(cb) {
    var sources = gulp.src([ paths.dist + '**/*.js', paths.dist + '**/*.css' ])

    return gulp
        .src(paths.dist + 'index.html')
        .pipe(inject(sources, { relative: true }))
        .pipe(gulp.dest(paths.dist));
}
/************************************************************/
/************************************************************/
