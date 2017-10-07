const gulp = require('gulp')
const watch = require('gulp-watch')
const webserver = require('gulp-webserver')

gulp.task('watch', () => {
  watch('front/app/**/*.html', () => gulp.start('app.html'))
  watch('front/app/**/*.css', () => gulp.start('app.css'))
  watch('front/app/**/*.js', () => gulp.start('app.js'))
  watch('front/public/assets/**/*.*', () => gulp.start('app.assets'))
})

gulp.task('server', ['watch'], () => {
  return gulp.src('front/public').pipe(webserver({
    livereload: true,
    port: 4000,
    open: true
  }))
})