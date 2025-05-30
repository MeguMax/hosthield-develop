// gulp
import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import gulpif from 'gulp-if';

const env = process.env.NODE_ENV || 'development';

export const js = () => {
  return browserify({
    entries: ['./src/js/main.js'],
    transform: [
      babelify.configure({
        presets: ['@babel/preset-env'],
      }),
    ],
    debug: env === 'development',
  })
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulpif(env === 'development', gulp.dest('./dist')))
    .pipe(gulpif(env === 'production', gulp.dest('./dist')));
};
