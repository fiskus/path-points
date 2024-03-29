var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');

gulp.task('stylus', function () {
  gulp.src('./stylus/app.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('scripts', function() {
  gulp.src('./js/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
    gulp.watch('./js', ['scripts']);
    gulp.watch('./stylus', ['stylus']);
});

gulp.task('default', ['watch', 'stylus', 'scripts']);
