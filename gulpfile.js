(()=>{

  // TODO : each task should go to each separate module

  'use strict';

  // Upgrade to node 6 or use babel for import usage
  const gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    mocha = require('gulp-mocha'),
    pugLinter = require('gulp-pug-linter'),
    debug = require('gulp-debug'),
    del = require('del');

  const tasks = {

    sass(){
      return gulp.src('./app/css/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./www/css'));
    },

    pug () {
      return gulp.src('./app/views/**/*.pug')
        .pipe(debug({title: 'unicorn:'}))
        .pipe(pug({
          pretty: true
        }))
        .pipe(gulp.dest('www'));
    },
    mocha (){
      return gulp.src(['./test/**/*.js'], {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({
          reporter: 'nyan',
          recursive: true
        })).once('error', function () {
          process.exit(1);
        });
    },
    gulpLint(){
      return gulp
        .src('./app/views/**/*.pug')
        .pipe(pugLinter())
        .pipe(pugLinter.reporter());
    },
    www : {
      clean () {
        return del([
          'www/**/*'
        ]);
      }
    },
    partials : {
      clean () {
        return del([
          'www/partials'
        ]);
      }
    }

  };

  // TODO: have another task for deploy
  gulp.task('compile:sass', tasks.sass);
  gulp.task('lint:pug', tasks.pugLinter);
  gulp.task('compile:pug', tasks.pug);
  gulp.task('test:mocha', tasks.mocha);
  gulp.task('clean:www', tasks.www.clean);

  // TODO : would be nice to instead of cleaning the partials folder after the generation, not to generate it at all
  gulp.task('clean:partials', ['compile:pug'], tasks.partials.clean);
  gulp.task('default', ['clean:www', 'test:mocha', 'compile:sass', 'lint:pug', 'compile:pug', 'clean:partials']);

})();

