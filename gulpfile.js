const gulp = require('gulp')
const util = require('gulp-util')
const sequence = require('run-sequence')

require('./build/app')
require('./build/deps')
require('./build/server')
require('./gulp.test')

gulp.task('default', () => {
  if(util.env.production) {
    sequence('deps', 'app')
  } else {
    sequence('deps', 'app', 'server')
  }
})

gulp.task('test.auto', () => {
  sequence('app.test', 'test.watch')
})

gulp.task('test.travis', () => {
  sequence('deps', 'app.test', 'test.front')
})