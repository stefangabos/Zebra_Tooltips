'use strict';

module.exports = function(grunt) {

    // show time spent on each taks
    require('time-grunt')(grunt);

    grunt.initConfig({

        // load packages.json
        pkg: grunt.file.readJSON('package.json'),

        /***************************************************************************************************************
         *  NOTIFY
         *  https://github.com/dylang/grunt-notify
         **************************************************************************************************************/
        'notify': {
            done: {
                options: {
                    title: 'Grunt ',
                    message: 'All taks were successfully completed!'
                }
            }
        },

        /***************************************************************************************************************
         *  SASS
         *  https://www.npmjs.org/package/grunt-sass
         **************************************************************************************************************/
        'sass': {
            minified: {
                options: {
                    outputStyle: 'expanded',
                    indentWidth: 4
                },
                files: {
                    'dist/zebra_tooltips.css': 'src/zebra_tooltips.scss'
                }
            },
            expanded: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'dist/zebra_tooltips.min.css': 'src/zebra_tooltips.scss'
                }
            }
        },

        /***************************************************************************************************************
         *  ESLINT
         *  http://eslint.org/docs/rules/
         **************************************************************************************************************/
        'eslint' : {
            options: {
                configFile: 'eslint.json'
            },
            src: ['src/zebra_tooltips.src.js']
        },

        /***************************************************************************************************************
         *  JSHINT
         *  https://npmjs.org/package/grunt-contrib-jshint
         **************************************************************************************************************/
        'jshint': {
            options: {
                strict:     false,       //  requires all functions to run in ECMAScript 5's strict mode
                asi:        true,       //  suppresses warnings about missing semicolons
                globals: {              //  white list of global variables that are not formally defined in the source code
                    '$':                true,
                    'alert':            true,
                    'console':          true,
                    'elements':         true,
                    'internal_counter': true,
                    'event_listeners':  true
                },
                browser:    true,       //  defines globals exposed by modern browsers (like `document` and `navigator`)
                bitwise:    true,       //  prohibits the use of bitwise operators such as ^ (XOR), | (OR) and others
                curly:      false,      //  whether to always put curly braces around blocks in loops and conditionals
                eqeqeq:     true,       //  this options prohibits the use of == and != in favor of === and !==
                freeze:     true,       //  this options prohibits overwriting prototypes of native objects such as Array, Date and so on
                scripturl:  true,       //  allow use of scripts
                nonew:      true,       //  this option prohibits the use of constructor functions without assigning them to a variable
                loopfunc:   true,       //  allow functions to be defined inside loops
                undef:      true        //  this option prohibits the use of explicitly undeclared variables
            },
            src: ['src/zebra_tooltips.src.js']
        },

        /***************************************************************************************************************
         *  UGLIFY
         *  https://npmjs.org/package/grunt-contrib-uglify
         **************************************************************************************************************/
        'uglify': {
            options: {
                compress: true,
                mangle: true,
                beautify: false
            },
            build: {
                src: 'src/zebra_tooltips.src.js',
                dest: 'dist/zebra_tooltips.min.js'
            }
        },

        /***************************************************************************************************************
         *  COPY
         *  https://github.com/gruntjs/grunt-contrib-copy
         **************************************************************************************************************/
        'copy': {
            all: {
                src: 'src/zebra_tooltips.src.js',
                dest: 'dist/zebra_tooltips.src.js'
            }
        },

        /***************************************************************************************************************
         *  WATCH
         *  https://npmjs.org/package/grunt-contrib-watch
         **************************************************************************************************************/
        'watch': {
            js: {
                files: ['src/zebra_tooltips.src.js'],
                tasks: ['newer:eslint', 'newer:jshint', 'newer:uglify', 'notify:done'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['src/zebra_tooltips.scss'],
                tasks: ['newer:sass', 'notify:done'],
                options: {
                    livereload: true
                }
            }
        }

    });

    // register plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('default', ['sass', 'eslint', 'jshint', 'uglify', 'copy', 'watch']);

};