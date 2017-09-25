const gulp = require('gulp');
const pug = require('gulp-pug');

gulp.task('pug', () => {
    "use strict";
    gulp.src('src/pug/.pug')
        .pipe(pug({
            pretty: '\t'
        }))
        .pipe(gulp.dest('dist/html'))
});

gulp.task('watch', () => {
    "use strict";
    gulp.watch('src/pug/.pug', ['pug'])
});pug --watch --pretty ./src/pug/ --out ./dist/html/