var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename=require("gulp-rename"),
    webserver = require('gulp-webserver');

// task for minify
gulp.task('build', function() {
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src('src/ng-percentage-chart.js')
        .pipe(uglify())
        .pipe(rename("ng-percentage-chart.min.js"))
        .pipe(gulp.dest('dist'));

});

// task for webserver start
gulp.task('server', function() {
    return gulp.src('.')
        .pipe(webserver({
        	open:true,
        	livereload:true,
        	fallback:'index.html'
        }));
});
