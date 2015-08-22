'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var gutil       = require('gulp-util');
var plugins     = require( 'gulp-load-plugins' )({ camelize: true});

/***************
* Default Task *
****************/
gulp.task('default', ['serve', 
                      'compile-bootstrap', 'compile-bootstrap-theme',
                      'minify-bootstrap', 'minify-bootstrap-theme']);

/*******************************************
* Static Server + watching scss/html files *
********************************************/
gulp.task('serve', ['minify-main-styles'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("source/sass/main.scss", ['minify-main-styles']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});


/*******************
* Sass Compilation *
********************/

// Compile main.scss into CSS
gulp.task('compile-main-styles', function() {
    return gulp.src("source/sass/bootstrap.scss")
        .pipe(plugins.sass({outputStyle: 'compressed'})).on('error', plugins.sass.logError)
        .pipe(gulp.dest("dist/css"));
});

gulp.task('compile-bootstrap', function() {
    return gulp.src("source/sass/bootstrap.scss")
        .pipe(plugins.sass({outputStyle: 'compressed'})).on('error', plugins.sass.logError)
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('compile-bootstrap-theme', function() {
    return gulp.src("source/sass/bootstrap/theme.scss")
        .pipe(plugins.rename('bootstrap-theme.scss'))
        .pipe(plugins.sass()).on('error', plugins.sass.logError)
        .pipe(gulp.dest("dist/css"));
});

/*******************
* CSS Minification *
********************/

// It generates 'main.min.css' & auto-inject into browser
gulp.task('minify-main-styles', ['compile-main-styles'], function() {
  return gulp.src('dist/css/bootstrap.css')
    .pipe(plugins.rename('bootstrap.min.css'))
    .pipe(plugins.minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}); 

// It generates 'bootstrap.min.css'
gulp.task('minify-bootstrap', ['compile-bootstrap'], function() {
  return gulp.src('dist/css/bootstrap.css')
    .pipe(plugins.rename('bootstrap.min.css'))
    .pipe(plugins.minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
}); 

// It generates 'bootstrap-theme.min.css' (Optional theme)
gulp.task('minify-bootstrap-theme', ['compile-bootstrap-theme'], function() {
  return gulp.src('dist/css/bootstrap-theme.css')
    .pipe(plugins.rename('bootstrap-theme.min.css'))
    .pipe(plugins.minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});