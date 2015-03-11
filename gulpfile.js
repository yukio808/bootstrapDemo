var gulp = require('gulp');
var less = require('gulp-less');
var connect = require('gulp-connect');

var PathTo = {
  LessFiles      : './less/*.less',
  PublicFolder   : './public',
  PublicCss      : './public/css',
  PublicCssFiles : './public/css/*.css'
};

gulp.task('less', function() {
    gulp.src('./less/*.less')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')],
            sourceMap: true
        }))
        .pipe(gulp.dest('./public/css/*.css'))
});

gulp.task('watch-files', function (){
  gulp.watch(PathTo.LessFiles, ['compile-less']);
  //gulp watch (path to css files)
  gulp.watch('./public/**/*', ['html']);
});

gulp.task('compile-less', function (){
  return gulp
          .src(PathTo.LessFiles, ['compile-less'])
          .pipe(less({errLogToConsole : true }))
          .pipe(gulp.dest(PathTo.PublicCss))
          .pipe(connect.reload());
});

gulp.task('html', function (){
  return gulp.src('./public/*.html')
    .pipe(connect.reload());
});

gulp.task('livereload', function (){
  gulp.src('./public/**/*')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('./less/*.less', ['less']);
  gulp.watch('./public/**/*' ['livereload']);
});

gulp.task('public-server', function (){
  connect.server({
    root       : './public',
    port       : 8080,
    livereload : true
  });
});

gulp.task('default', ['public-server', 'compile-less', 'watch-files']);