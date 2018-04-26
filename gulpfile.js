const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const rimraf = require('rimraf');
const mergeStream = require('merge-stream');
const babel = require('gulp-babel');
const pump = require('pump');
var uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const svgo = require('gulp-svgo');
const zipFolder = require('zip-folder');

gulp.task('prodBuildFirefox', gulpSequence('removeDist', 'copyFiles', 'transpileJs','optimizeSVGs', 'zipFolder'));
gulp.task('prodBuildChrome', gulpSequence('removeDist', 'copyFiles', 'transpileJs', 'minifyCss', 'uglifyJS','optimizeSVGs', 'zipFolder'));

gulp.task('removeDist', (cb) => {
  return rimraf('./dist', cb);
});

gulp.task('copyFiles', () => {
  let popup = gulp.src('popup/**/*')
    .pipe(gulp.dest('dist/popup'));
  let manifest = gulp.src('manifest.json')
    .pipe(gulp.dest('dist'));
  let icons = gulp.src('icons/**/*')
    .pipe(gulp.dest('dist/icons'));
  return mergeStream(popup,manifest,icons);
});

gulp.task('transpileJs', () =>
  gulp.src('dist/popup/app/main.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('dist/popup/app'))
);

gulp.task('minifyCss', () => {
  return gulp.src('dist/popup/app/main.css')
    .pipe(cssnano())
    .pipe(gulp.dest('dist/popup/app/'));
});

gulp.task('uglifyJS', (cb) => {
  pump([
    gulp.src('dist/popup/app/main.js'),
    uglify(),
    gulp.dest('dist/popup/app')
  ],
  cb
  );
});

gulp.task('optimizeSVGs', () => {
  return gulp.src('dist/icons/**/*')
    .pipe(svgo())
    .pipe(gulp.dest('dist/icons/'));
});

gulp.task('zipFolder', () => {
  return zipFolder('dist', 'YouTabMan.zip', function(err) {
    if(err) {
      console.error('oh no!', err); //eslint-disable-line
    } else {
      console.log('EXCELLENT'); //eslint-disable-line
    }
  });
});
