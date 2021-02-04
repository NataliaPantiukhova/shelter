const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');

gulp.task('sass-compile-main', function(){
    return gulp.src('./pages/main/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./pages/main/'))
})

gulp.task('sass-compile-pets', function(){
    return gulp.src('./pages/pets/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./pages/pets/'))
})

gulp.task('watch', function(){
    gulp.watch('./pages/main/**/*.scss', gulp.series('sass-compile-main'))
    gulp.watch('./pages/pets/**/*.scss', gulp.series('sass-compile-pets'))

})