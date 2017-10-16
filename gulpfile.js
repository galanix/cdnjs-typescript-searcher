var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
 
gulp.task('app', function() {
    gulp.src('src/app/app.component.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/app/'));
});

gulp.task('index', function() {
    gulp.src('src/app/index/index.component.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/app/index/'));
});

gulp.task('newpage', function() {
    gulp.src('src/app/newpage/newpage.component.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/app/newpage/'));
});

gulp.task('styles', function() {
    gulp.src('src/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/'));
});