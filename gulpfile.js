const gulp = require('gulp');
const useref = require('gulp-useref');
const csso = require('gulp-csso');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const autprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('useref', () => {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpif('*.css', csso()))
        .pipe(gulp.dest('dist'))
});

gulp.task('style', () => {
    return gulp.src('src/*.scss')
        .pipe(sass())
        .pipe(autprefixer({
            browsers: ['last 50 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task("images", () => {
    return gulp.src('src/img/**/*.*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch("./src/**/*.html", ['useref']);
    gulp.watch("src/img/**/*.*", ['images']);
    gulp.watch("src/img/**/*.*").on("change", browserSync.reload);
    gulp.watch("./dist/**/*.html").on("change", browserSync.reload);
    gulp.watch("src/*.scss", ['style']);

});