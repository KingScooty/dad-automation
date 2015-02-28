var gulp = require('gulp');
var gulpif = require('gulp-if');

var plumber = require('gulp-plumber');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');

var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var config = require('./_config');

/**
 * JS gulp task
 */


gulp.task('js-test', function() {
 // https://www.npmjs.org/package/gulp-karma
});

gulp.task('js-compile', function() {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });
  
  return gulp.src([config.paths.js.src + 'main.js'])
    
    .pipe(plumber())
    .pipe(browserified)

    // If production, minify
    .pipe(gulpif(config.isProduction, uglify()))

    .pipe(gulp.dest(config.paths.js.dest))

    //Reload for browsersync
    .pipe(reload({stream:true}));
});



gulp.task('js-copy', function() {
  // Copy assets/javascripts/ to static
  gulp.src(config.paths.js.src + '**/*')
    .pipe(gulp.dest(config.paths.js.dest));  

  // Copy assets/bower_components/ to static
  gulp.src(config.paths.bower.src + '**/*')
    .pipe(gulp.dest(config.paths.bower.dest));  
});

// Watch task currently set to run the js-test task on file change.
// (The js-test task is incomlete at the moment, so this task won't 
// do anything.)
gulp.task('js-watch', function() {
  gulp.watch(config.sourceFiles.scripts, ['js-compile']).on('change', function(evt) {
      config.changeEvent(evt);
  });
});