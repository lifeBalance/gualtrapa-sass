'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var gutil       = require('gulp-util');
var plugins     = require( 'gulp-load-plugins' )({ camelize: true});

/***************
* Default Task *
****************/
gulp.task('default', ['serve']);

/*******************************************
* Static Server + watching scss/html files *
********************************************/
gulp.task('serve', ['templates', 'sass', 'scripts'], function() {

  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  gulp.watch(["source/templates/**/*.nunjucks"], ['templates']);
  gulp.watch("source/sass/main.scss", ['sass']);
  gulp.watch("source/js/*.js", ['scripts']);

  gulp.watch("*.html").on('change', browserSync.reload);
  gulp.watch("css/*.css").on('change', browserSync.reload);
  gulp.watch("js/scripts.js").on('change', browserSync.reload);
});

/*******************
*     Nunjucks     *
********************/
function nunjucksError(error){
  plugins.notify.onError({  title: "Nunjucks Error", 
                            message: "Check your terminal: <%= error.message %>",
                            sound: "Sosumi"})(error); //Error Notification
  gutil.log(error.toString());
  this.emit("end"); // End function
};

var nunjucksOpts = {
  searchPaths: ['source/templates/layouts', 'source/templates/partials']
};

gulp.task('templates', function () {
    return gulp.src('source/templates/*.nunjucks')
        .pipe(plugins.plumber({ errorHandler: nunjucksError }))
        .pipe(plugins.nunjucksHtml( nunjucksOpts ))
        .pipe(plugins.jsbeautifier({indentSize: 2}))
        .pipe(plugins.rename(function (path) {
          path.extname = ".html"
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

/*******************
* Sass Compilation *
********************/
function errorAlert(error){
  plugins.notify.onError({  title: "SCSS Error", 
                            message: "Check your terminal: <%= error.message %>",
                            sound: "Sosumi"})(error); //Error Notification
  gutil.log(error.toString());
  this.emit("end"); // End function
};

// Compile main.scss into CSS
gulp.task('sass', function() {
  return gulp.src("source/sass/main.scss")
    .pipe(plugins.plumber({ errorHandler: errorAlert }))
    .pipe(plugins.scssLint({
          'config': 'sass-lint-config.yml'
    }))
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer({
      browsers: [ '> 1%',
                  'last 2 versions',
                  'firefox >= 4',
                  'safari 7',
                  'safari 8',
                  'IE 8',
                  'IE 9',
                  'IE 10',
                  'IE 11'],
      cascade: false
    }))
    .pipe(gulp.dest("dist/css"))
    .pipe(plugins.notify("CSS written!"))
    .pipe(browserSync.stream());
});

gulp.task('sass-watch', ['sass'], browserSync.reload);

/*************
* JavaScript *
**************/

/* JShint: linting our JavaScripts */
gulp.task('jshint', function() {
  return gulp.src(['source/js/*.js'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

/* Concatenating Javascripts.
   Feel free to add your own scripts to the list. */
gulp.task('scripts', ['jshint'], function() {
  return gulp.src([ 'source/js/bootstrap/transition.js',
                    'source/js/bootstrap/alert.js',
                    'source/js/bootstrap/buttons.js',
                    'source/js/bootstrap/carousel.js',
                    'source/js/bootstrap/collapse.js',
                    'source/js/bootstrap/dropdown.js',
                    'source/js/bootstrap/modal.js',
                    'source/js/bootstrap/tooltip.js',
                    'source/js/bootstrap/popover.js',
                    'source/js/bootstrap/scrollspy.js',
                    'source/js/bootstrap/tab.js',
                    'source/js/bootstrap/affix.js',
                    'source/js/custom1.js',])
    .pipe(plugins.concat('scripts.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});


/*************************************************
*              MANUAL TASKS                      *
*------------------------------------------------*
* These tasks are not essential for the          *
* development workflow, hence we have put them   *
* here, so they can be run separately,           *
* for example:                                   *
*                                                *
*     $ gulp minify-main-styles                  *
*                                                *
**************************************************/

/*******************
* Sass Compilation *
********************/

// Compile bootstrap.scss into CSS. (For illustrative purposes)
gulp.task('compile-bootstrap', function() {
  return gulp.src("source/sass/bootstrap.scss")
    .pipe(plugins.sass())
    .pipe(gulp.dest("dist/css"));
});

// Compile theme.scss into bootstrap-theme.css (For illustrative purposes)
gulp.task('compile-bootstrap-theme', function() {
  return gulp.src("source/sass/bootstrap-theme.scss")
    .pipe(plugins.sass())
    .pipe(gulp.dest("dist/css"));
});

/*******************
* CSS Minification *
********************/

// It generates 'main.min.css'
gulp.task('minify-main-styles', ['sass'], function() {
  return gulp.src('dist/css/main.css')
    .pipe(plugins.rename('main.min.css'))
    .pipe(plugins.minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
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

/***************************
* Javascript Minification  *
****************************/
gulp.task('compress-scripts', ['scripts'], function() {
  return gulp.src('dist/js/scripts.js')
    .pipe(plugins.rename('scripts.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('dist/js'));
});