var gulp = require('gulp');
var git = require('gulp-git');

gulp.task('add', function(){
    return gulp.src('.')
        .pipe(git.add());
});

gulp.task('commit', function(){
    return gulp.src('.')
        .pipe(git.commit('auto commit'));
});

gulp.task('push', function(){
    git.push('umbler', 'master', function(err){
        if(err) {
            throw err;
        }
    });
});

gulp.task('publish', ['add', 'commit', 'push']);