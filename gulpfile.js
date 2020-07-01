//load dependecies
var gulp             = require('gulp'),
	autoprefixer     = require('autoprefixer'),
	notify           = require('gulp-notify'),
	plumber          = require('gulp-plumber'),
	postcss          = require('gulp-postcss'),
	sourcemaps       = require('gulp-sourcemaps'),
	sass             = require('gulp-sass'),
	flexBugsFix      = require('postcss-flexbugs-fixes');


//error notification settings for plumber
var msgERROR = {
	errorHandler: notify.onError({
		title: 'Fix that ERROR:',
		message: "<%= error.message %>",
		time: 2000,
	})
};

gulp.task('build', ['css']);

//css
gulp.task('css', function() {
	var prefix = [
		autoprefixer({ browsers: ['last 3 versions', 'ios >= 6'] }),
		flexBugsFix
	];
	return gulp.src(['assets/scss/**/*.scss'])
		.pipe(plumber(msgERROR))
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(postcss(prefix))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(''));
});

//watch
gulp.task('watch', function() {
	//watch .scss files
	gulp.watch('assets/scss/**/*.scss', ['css']);
});
