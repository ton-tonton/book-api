const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('default', ['server']);

gulp.task('server', () => {
  nodemon({
    script: 'src/app.js',
    ext: 'js',
    env: {
      PORT: 8000
    },
    ignore: ['./node_modules/**']
  })
  .on('restart', () => {
    console.log('Restarting');
  });
});
