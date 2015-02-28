module.exports = (grunt) ->
 
  # configuration
  grunt.initConfig
  
    #deploy 
    rsync:
      options:
        src: "app/"
        args: ["--verbose"]
        exclude: [".git*", "node_modules", ".sass-cache", "Gruntfile.js", "templates",
        "package.json", ".DS_Store", "README.md", ".jshintrc", "build-pipeline", 
        "gulpfile.js", "Gruntfile.coffee", "bower.json",
        ".bowerrc", "sass"]
        recursive: true
        syncDestIgnoreExcl: true
      staging:
        options:
          dest: "domains/supremo.wildflame.co.uk/html"
          host: "serveradmin%wildflame.co.uk@wildflame.co.uk"

    #assemble templates
    assemble: 
      options:
        flatten: false
        expand: true
        # assets: 'assets'
        # plugins: ['permalinks']
        partials: ['./app/templates/partials/**/*.hbs']
        layout: ['./app/templates/layouts/default.hbs']
        data: ['./app/data/*.yml']
        helpers: ['./build-pipeline/_helpers/helper-*.js']
      site:
        files: [
          expand: true
          cwd: "./app/templates/pages/"
          src: "**/*.hbs"
          dest: "app/compiled/"
          ext: ".html"
        ]
 
  # load plugins
  # grunt.loadNpmTasks "load-grunt-tasks"
  grunt.loadNpmTasks "grunt-rsync"
  grunt.loadNpmTasks "assemble"
 
  # tasks
  grunt.registerTask "deploy", ["rsync"]
  grunt.registerTask 'grunt-assemble', ['assemble']
