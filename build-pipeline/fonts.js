var gulp = require('gulp');
var flatten = require('gulp-flatten');

var config = require('./_config');

/**
 * Fonts gulp task
 */

gulp.task('fonts-copy', function() {
  gulp.src(config.paths.fonts.src + '**/*.{ttf,woff,eof,svg, eot}')
  .pipe(flatten())
  .pipe(gulp.dest(config.paths.fonts.dest));
});
