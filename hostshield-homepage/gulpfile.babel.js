// gulp
import gulp, { parallel, series } from 'gulp';
import browsersync from 'browser-sync';

//tasks
import { js } from './src/gulp/javascript.gulp';
import { css } from './src/gulp/css.gulp';

const myBrowsersync = () => {
  let files = [
    'dist/**/*',
    '**/*.html',
    '!dist/main.js.map',
    '!dist/styles.css.map',
  ];
  browsersync.init(files, {
    server: {
      baseDir: './',
    },
  });
};

const watchFiles = () => {
  gulp.watch('src/scss/**/*', css);
  gulp.watch('src/js/**/*', js);
  myBrowsersync();
};

export const dev = parallel(js, css);
export const prod = parallel(js, css);
export const watch = series(dev, watchFiles);
