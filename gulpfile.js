var gulp = require('gulp');
var git = require('gulp-git');

gulp.task('publish', function(){
    return gulp.src('.')
        .pipe(git.add())
        .pipe(git.commit('auto commit'))
        .pipe(git.push('umbler', 'master', function(err){if(err) throw err;}));
});

