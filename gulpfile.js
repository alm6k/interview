var gulp = require('gulp'),
    istanbul = require('gulp-istanbul'),
    jasmine = require('gulp-jasmine'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    jsFiles = 'static/ambition/js/*.js',
    testFiles = 'static/ambition/js/test/*.js';

gulp.task('jshint', function() {
    gulp.src(jsFiles)
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('jscs', function() {
    gulp.src(jsFiles)
        .pipe(jscs())
        .on('error', function(error) {
            console.log(error.message);
        });
});

gulp.task('istanbul', function(cb) {
    gulp.src(jsFiles)
        .pipe(istanbul())
        .on('end', cb);
});

gulp.task('lint', function() {
    gulp.run('jscs', 'jshint');
});

gulp.task('test', function() {
    gulp.run('istanbul', function() {
        gulp.src(testFiles)
            .pipe(jasmine())
            .pipe(istanbul.writeReports());
    });
});

gulp.task('default', function() {
    gulp.run('test', 'lint');
});
