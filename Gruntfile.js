module.exports = function (grunt) {

    var LIVERELOAD_PORT = 35729;
    var modRewrite = require('connect-modrewrite');

    grunt.initConfig
    ({
        pkg: grunt.file.readJSON('./package.json'),

        watch: {
            options: {cwd: 'app', livereload: LIVERELOAD_PORT},
            files: ['*.html', '*.js', '_scss/*.scss', '_scss/**/*.scss', 'scripts/**/*.js', 'templates/**/*.mustache', 'locales/*.json'],
            tasks: ['mustache_combine:staging', 'sass', 'newer:copy:staging'],

        },

        connect: {
            server: {
                options: {
                    base: 'app/',
                    // This will inject live reload script into the html
                    livereload: LIVERELOAD_PORT,

                    'middleware' : function(connect, options, middlewares) {
                        var modRewrite = require('connect-modrewrite');

                        // enable Angular's HTML5 mode
                        middlewares.unshift(modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.woff|\\.woff2$ /index.html [L]']));

                        return middlewares;
                    }
                }
            }
        },

        open: {
            dev: {
                path : 'http://localhost:8000'
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('watcher', [ 'watch' ]);
    grunt.registerTask('start', [ 'connect', 'open', 'watch']);
};