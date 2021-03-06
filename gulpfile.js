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
    del = require('del'),
    nsp = require('gulp-nsp'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    rename = require('gulp-rename');

  const tasks = {

    nsp(cb){
      nsp({package: __dirname + '/package.json'}, cb);
    },
    js: {
      lint() {
        return gulp.src('./app/js/*.js')
          .pipe(jshint({
            esnext : true
          }))
          .pipe(jshint.reporter(stylish))
          .pipe(jshint.reporter('fail'))
      },
      browserify(){
        return browserify("./app/js/app.js")
          .transform("babelify", {presets: ["es2015", "react"]}) // https://www.npmjs.com/package/babelify
          .bundle()
          .on('error', function (err) {
            console.error(err);
            this.emit('end');
          })
          .pipe(source("app.js"))
          .pipe(buffer())
          .pipe(uglify({
            compress: {
              drop_console: true
            }
          }))
          .pipe(rename("app.min.js"))
          .pipe(gulp.dest("./www/js"));
      }
    },
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
      copy (cb) {
        // copy('./app/images', 'www', cb);
        return gulp.src('./app/images/**/*', {base: './app/images/'})
          .pipe(gulp.dest('./www/images'));
      },
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
  gulp.task('compile:sass', ['clean:www'], tasks.sass);
  gulp.task('lint:pug', tasks.pugLinter);
  gulp.task('compile:pug',  ['clean:www'], tasks.pug);
  gulp.task('test:mocha', tasks.mocha);
  gulp.task('clean:www', tasks.www.clean);
  gulp.task('copy:images:www', ['clean:www'], tasks.www.copy);
  gulp.task('security:nsp', tasks.nsp);
  gulp.task('compile:js', ['lint:js'], tasks.js.browserify);
  gulp.task('lint:js', tasks.js.lint);

  // TODO : would be nice to instead of cleaning the partials folder after the generation, not to generate it at all
  gulp.task('clean:partials', ['compile:pug'], tasks.partials.clean);

  gulp.task('default', ['security:nsp',
    'clean:www', 'test:mocha',
    'compile:sass', 'lint:pug',
    'compile:pug', 'lint:js',
    'compile:js', 'clean:partials',
    'copy:images:www']);

})();

