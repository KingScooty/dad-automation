var gutil = require('gulp-util');
var args  = require('yargs').argv;

var isProduction = args.env === 'production';

var basePaths = {
  src:    'app/assets/',
  dest:   'app/static/'
};

var paths = {
  bower: {
    src:   basePaths.src  + 'bower_components/',
    dest:  basePaths.dest + 'bower_components/',
  },
  fonts: {
    src:   basePaths.src  + 'fonts/',
    dest:  basePaths.dest + 'fonts/'
  },
  sass: {
    src:   basePaths.src  + 'sass/',
    dest:  basePaths.dest + 'stylesheets/'
  },
  js: {
    src :  basePaths.src  + 'javascripts/',
    dest:  basePaths.dest + 'javascripts/'
  },
  test:    basePaths.src  + 'tests'
};

var sourceFiles = {
  styles:  paths.sass.src + '**/*.scss',
  scripts: [paths.js.src  + '**/*.js']
};

changeEvent = function(evt) {
    gutil.log('File', gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + basePaths.src + ')/'), '')), 'was', gutil.colors.magenta(evt.type));
};

exports.basePaths = basePaths;
exports.paths = paths;
exports.sourceFiles = sourceFiles;
exports.changeEvent = changeEvent;
exports.isProduction = isProduction;
