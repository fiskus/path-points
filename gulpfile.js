var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('stylus', function () {
  gulp.src('./stylus/app.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./css/'));
});

gulp.task('watch', function() {
    gulp.watch('./stylus', ['stylus']);
});

gulp.task('default', ['watch', 'stylus']);
