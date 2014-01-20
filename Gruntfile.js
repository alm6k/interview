module.exports = function(grunt) {
    var jsFiles = ['static/ambition/**/*.js'],
        libFiles = ['static/lib/**/*.js'],
        testFiles = ['static/ambition/test/*.js'],
        lintFiles = ['Gruntfile.js'].concat(jsFiles),
        pkg = grunt.file.readJSON('package.json'),
        npmTasks = [
            'grunt-contrib-jshint',
            'grunt-jscs-checker',
            'grunt-contrib-jasmine'
        ];

    grunt.initConfig({
        pkg: pkg,
        jshint: {
            all: lintFiles
        },
        jscs: {
            all: lintFiles
        },
        jasmine: {
            src: jsFiles,
            options: {
                specs: testFiles,
                vendor: libFiles
            }
        }
    });

    npmTasks.forEach(function(task) {
        grunt.loadNpmTasks(task);
    });

    grunt.registerTask('default', ['jshint', 'jscs', 'jasmine']);
};
