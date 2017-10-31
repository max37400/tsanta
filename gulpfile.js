var gulp = require('gulp');

var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var base = 'tsanta/front/static/';

var less_directory = base + 'styles/less/';
var js_directory = base + 'js/';

// Tasks
gulp.task('front-less-standalone', function() {
	return gulp.src(less_directory + 'scaffolding.less')
		.pipe(less())
		.pipe(rename('styles.css'))
		.pipe(gulp.dest('tsanta/front/static/styles'))
});

gulp.task('front-less-mobile', function () {
	return gulp.src(less_directory + 'scaffolding.mobile.less')
		.pipe(less())
		.pipe(rename('styles.mobile.css'))
		.pipe(gulp.dest('tsanta/front/static/styles'))
});

gulp.task('front-less', ['front-less-standalone', 'front-less-mobile']);

gulp.task('front-less-watch', function() {
	gulp.watch(less_directory + '**/*.less', ['front-less']);
});
