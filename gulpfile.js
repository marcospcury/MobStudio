const gulp = require('gulp')
const util = require('gulp-util')
const sequence = require('run-sequence')

require('./build/app')
require('./build/deps')
require('./build/server')

gulp.task('default', () => {
  if(util.env.production) {
    sequence('deps', 'app')
  } else {
    sequence('deps', 'app', 'server')
  }
})