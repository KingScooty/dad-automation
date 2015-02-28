var gulp = require('gulp');
var browserSync = require('browser-sync');

// Static server
gulp.task('browser-sync', function() {
  browserSync({
    startPath: "/compiled/",
    server: {
      baseDir: "./app"
    }//,
    // files : {
    //   src : ['app/templates/**/*.hbs']
    // }
  });
});