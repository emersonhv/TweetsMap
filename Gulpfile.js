var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	minifyCSS = require('gulp-minify-css'),
	concatCss = require('gulp-concat-css'),
	concatJs = require('gulp-concat'),
	notify = require('gulp-notify'),
	uglify = require('gulp-uglify');

//DESARROLLO CONCATENAR SOLAMENTE
gulp.task('default',['css', 'js']); //,'cssApp','jsApp'

gulp.task('css', function (){
  gulp.src([
			'node_modules/angular-material/angular-material.css',
			'node_modules/angular-material/angular-material.layouts.css',
			'public/css/app.css',
          ],{base:'public/'})
  .pipe(concatCss("todoCss.css",{rebaseUrls:false}))
  .pipe(minifyCSS({keepBreaks:false,rebase:false}))
  .pipe(gulp.dest('public/css'))
});

gulp.task('js', function (){
  gulp.src([
            'node_modules/angular/angular.js',
			'node_modules/angular-aria/angular-aria.js',
			'node_modules/angular-animate/angular-animate.js',
			'node_modules/angular-material/angular-material.js',
			'public/js/app.js',
          ],{base:'public/'})
  .pipe(concatJs('todoJs.js'))
  .pipe(uglify({mangle: false}))
  .pipe(gulp.dest('public/js'))
  .pipe(notify("Ha finalizado la task js!"));
});

