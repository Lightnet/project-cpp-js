//https://semaphoreci.com/community/tutorials/getting-started-with-gulp-js
//https://github.com/AveVlad/gulp-connect/pull/92

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
//var io = require('socket.io')

var outputDir = 'bin';
var jsSources = ['src/godot_client.js','src/godot_js.js'];

gulp.task('connect', function() {
  var app = connect.server({
    root: './bin',
    livereload: true
  });
  var io = require('socket.io')(app.server);
  io.on('connection', function(socket) {
    // do stuff
    console.log("connect client!");
  });
});

gulp.task('js', function() {
  gulp.src(jsSources)
  .pipe(uglify())
  .pipe(concat('script.js'))
  .pipe(gulp.dest(outputDir))
  .pipe(connect.reload())
});

gulp.task('files_js', function() {
  gulp.src(jsSources)
  //.pipe(uglify())
  //.pipe(concat('script.js'))
  .pipe(gulp.dest(outputDir))
  .pipe(connect.reload())
});

gulp.task('copy', function() {
  gulp.src('src/index.html')
  .pipe(gulp.dest(outputDir))
});

gulp.task('css', function() {
  gulp.src('index.css')
  .pipe(gulp.dest(outputDir))
});

gulp.task('watch', function() {
  //gulp.watch('scripts/hello.coffee', ['coffee']);
  //gulp.watch('styles/main.scss', ['sass']);
  //gulp.watch(jsSources, ['files_js']);
  gulp.watch('src/index.html', ['copy']);
  //gulp.watch('index.css', ['css']);
});

// create a default task and just log a message
//gulp.task('default', ['files_js','copy','css','connect','watch'] , function() {
  //return gutil.log('Gulp is running!');
//});

gulp.task('default', ['files_js','copy','connect','watch'] , function() {
  return gutil.log('Gulp is running!');
});