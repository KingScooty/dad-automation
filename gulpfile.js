var gulp = require('gulp');

var requireDir = require('require-dir');

var pipeline = requireDir('./build-pipeline');

gulp.task('default', [/* pre-requisite tasks go here */], function() {
  gulp.start('assemble', 'sass', 'js-compile', 'fonts-copy');
});

gulp.task('watch', ['assemble-watch', 'sass-watch', 'js-watch', 'browser-sync']);