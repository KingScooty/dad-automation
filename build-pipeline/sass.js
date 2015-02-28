var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var cssmin = require('gulp-cssmin');

var filter      = require('gulp-filter');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var gulpif = require('gulp-if');

var config = require('./_config');

/**
 * Sass gulp task
 * Autoprefixes, and generates a sourcemap, minifies if --env set to production
 */

gulp.task('sass', function () {
  return gulp.src(config.sourceFiles.styles)

    //Plumb pipe breaks incase of errors
    .pipe(plumber())

    //Config Sass
    .pipe(sass({ 
      compass: false,
      style: 'compact', 
      noCache: true
    }))

    //Autoprefixer
    .pipe(prefix({
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
        cascade: false
    }))

    // If production, minify
    .pipe(gulpif(config.isProduction, cssmin()))

    //Out put to path set in _config.
    .pipe(gulp.dest(config.paths.sass.dest))

    //Filter out source maps out of stream for browsersync
    .pipe(filter('**/*.css'))

    //Reload for browsersync
    .pipe(reload({stream:true}));
});

gulp.task('sass-watch', ['sass'], function(){
  gulp.watch(config.sourceFiles.styles, ['sass']).on('change', function(evt) {
      config.changeEvent(evt);
  });
});