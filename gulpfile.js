const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const cssnano = require('gulp-cssnano');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "src",
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/scss/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});



gulp.task('useref', function(){
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('src/*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('src/*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
    gulp.watch("src/scss/**/*.+(scss|sass)", gulp.parallel('styles'));
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));