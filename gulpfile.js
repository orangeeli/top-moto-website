(()=>{

  'use strict';

  // Upgrade to node 6 or use babel for import usage
  const gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug');

  const tasks = {

    sass(){
      return gulp.src('./app/css/app.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./www/css'));
    },

    pug () {
      return gulp.src('app/views/**/*.pug')
        .pipe(pug({
          pretty: true
        }))
        .pipe(gulp.dest('www'));
    },

    pugIndex () {
      return gulp.src('app/views/index.pug')
        .pipe(pug({
          pretty: true
        }))
        .pipe(gulp.dest('www'));
    },
    pugPages () {
      return gulp.src('app/views/**/index.pug')
        .pipe(pug({
          pretty: true
        }))
        .pipe(gulp.dest('www'));
    }

  };

  gulp.task('compile:sass', tasks.sass);
  gulp.task('compile:pug', tasks.pug);
  gulp.task('default', ['compile:sass', 'compile:pug']);

})();

