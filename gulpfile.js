var gulp = require('gulp');

var less = require('gulp-less');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var rename = require('gulp-rename');
var cleancss = require('gulp-clean-css');

var base = 'tsanta/front/static/';

var less_directory = base + 'styles/less/';
var js_directory = base + 'js/';

// Tasks
gulp.task('front-less-standalone', function() {
	return gulp.src(less_directory + 'scaffolding.less')
		.pipe(less())
		.pipe(rename('styles.min.css'))
		.pipe(cleancss())
		.pipe(gulp.dest('tsanta/front/static/styles'));
});

gulp.task('front-less-mobile', function () {
	return gulp.src(less_directory + 'scaffolding.mobile.less')
		.pipe(less())
		.pipe(rename('styles.mobile.min.css'))
		.pipe(cleancss())
		.pipe(gulp.dest('tsanta/front/static/styles'));
});

gulp.task('front-js-minify', function() {
	return gulp.src(js_directory + '*.js')
		.pipe(minify({
			ext: {
				min: '.min.js'
			}
		}))
		.pipe(gulp.dest(js_directory));
});

gulp.task('front-less', ['front-less-standalone', 'front-less-mobile']);

gulp.task('front-less-watch', ['front-less'], function() {
	gulp.watch(less_directory + '**/*.less', ['front-less']);
});
