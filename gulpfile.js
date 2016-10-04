const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const gulpMocha = require('gulp-mocha');
const env = require('gulp-env');

gulp.task('default', ['server']);

gulp.task('server', () => {
  nodemon({
    script: 'src/app.js',
    watch: 'src',
    ext: 'js',
    env: {
      PORT: 8000,
    },
    ignore: ['./node_modules/**'],
  })
  .on('restart', () => {
    console.log('Restarting');
  });
});

gulp.task('test', () => {
  env({ vars: { ENV: 'Test' } });
  gulp.src('./tests/**/*.js')
      .pipe(gulpMocha({ reporter: 'nyan' }));
});
