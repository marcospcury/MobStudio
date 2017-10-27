const gulp = require('gulp')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')
const htmlmin = require('gulp-htmlmin')

gulp.task('app', ['app.html', 'app.css', 'app.js', 'app.assets'])

gulp.task('app.html', () => {
  return gulp.src('front/app/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('front/public'))
})

gulp.task('app.css', () => {
  return gulp.src('front/app/**/*.css')
    .pipe(uglifycss({ "uglyComments": true }))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('front/public/assets/css'))
})

gulp.task('app.js', () => {
  return gulp.src('front/app/**/*.js')
    .pipe(babel({ presets: ['env'] }))
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('front/public/assets/js'))
})

gulp.task('app.assets', () => {
  return gulp.src('assets/**/*.*')
    .pipe(gulp.dest('front/public/assets'))
})

gulp.task('app.test', () => {
  return gulp.src('front/app/**/*.js')
    .pipe(babel({ presets: ['env'] }))
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('front/public/assets/js'))
})