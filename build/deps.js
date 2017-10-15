const gulp = require('gulp')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')

gulp.task('deps', ['deps.js', 'deps.css', 'deps.fonts', 'deps.res'])

gulp.task('deps.js', () => {
  return gulp.src([
    'node_modules/angular/angular.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/angular-toastr/dist/angular-toastr.tpls.min.js',
    'node_modules/angular-file-upload/dist/angular-file-upload.min.js',
    'node_modules/ng-image-gallery/dist/ng-image-gallery.min.js',
    'node_modules/admin-lte/plugins/jQuery/jquery-2.2.3.min.js',
    'node_modules/admin-lte/bootstrap/js/bootstrap.min.js',
    'node_modules/admin-lte/plugins/slimScroll/jquery.slimscroll.min.js',
    'node_modules/admin-lte/dist/js/app.min.js',
    'node_modules/angucomplete-alt/dist/angucomplete-alt.min.js',
  ])
  .pipe(uglify())
  .pipe(concat('deps.min.js'))
  .pipe(gulp.dest('front/public/assets/js'))
})

gulp.task('deps.css', () => {
  return gulp.src([
    'node_modules/angular-toastr/dist/angular-toastr.min.css',
    'node_modules/font-awesome/css/font-awesome.min.css',
    'node_modules/admin-lte/bootstrap/css/bootstrap.min.css',
    'node_modules/admin-lte/dist/css/AdminLTE.min.css',
    'node_modules/admin-lte/dist/css/skins/_all-skins.min.css',
    'node_modules/ng-image-gallery/dist/ng-image-gallery.min.css',
    'node_modules/angucomplete-alt/angucomplete-alt.css',
  ])
  .pipe(uglifycss({ "uglyComments": true }))
  .pipe(concat('deps.min.css'))
  .pipe(gulp.dest('front/public/assets/css'))
})

gulp.task('deps.fonts', () => {
  return gulp.src([
    'node_modules/font-awesome/fonts/*.*',
    'node_modules/admin-lte/bootstrap/fonts/*.*'
  ])
  .pipe(gulp.dest('front/public/assets/fonts'))
})

gulp.task('deps.res', () => {
  return gulp.src([
    'node_modules/ng-image-gallery/res/icons/*.*'
  ])
  .pipe(gulp.dest('front/public/assets/res/icons'))
})