// modules
const gulp     = require('gulp');
const pug      = require('gulp-pug');
const sass     = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const livereload = require('gulp-livereload');



//paths
const SRC_DIR  = './src/';
const DIST_DIR = './dist/';

const path = {
    sass : {
        entry : SRC_DIR + 'styles/main.scss',
        src   : SRC_DIR + 'styles/**/*.scss',
        dist  : DIST_DIR + 'css'
    },
    pug : {
        entry : SRC_DIR + 'pug/index.pug',
        src   : SRC_DIR + 'sections/**/*.pug',
        dist  : DIST_DIR + 'html'
    }

};

//tasks
gulp.task('pug', () => {
    "use strict";
    livereload.listen();
    return gulp.src(path.pug.entry)
        .pipe(pug({
            pretty: '\t'
        }))
        .pipe(gulp.dest(path.pug.dist))
});

gulp.task('sass', function() {
    "use strict";
    return gulp.src(path.sass.entry)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false
        }))
        .pipe(gulp.dest(path.sass.dist));
});

//watch
gulp.task('watch', () => {
    "use strict";
    gulp.watch(path.pug.src, ['pug']);
    gulp.watch(path.sass.src, ['sass']);
});

//default
gulp.task('default', ['sass', 'pug', 'watch']);

