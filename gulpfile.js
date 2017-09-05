var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var tsProject = ts.createProject("tsconfig.json")

gulp.task('sass', function(){
	return gulp.src('app/scss/styles.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
});

gulp.task('typescript', function(){
	return tsProject.src()
		.pipe(tsProject())
		.js.pipe(gulp.dest("dist"))
});
