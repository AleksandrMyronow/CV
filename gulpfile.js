// modules
const gulp     = require('gulp');
const pug      = require('gulp-pug');
const sass     = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-source-maps');
const autoprefixer = require('gulp-autoprefixer');
const spritesmith = require('gulp.spritesmith');


//paths
const SRC_DIR  = 'src/';
const DIST_DIR = 'dist/';

const path = {
    sass: {
        entry: SRC_DIR + 'styles/main.scss',
        src  : SRC_DIR + 'styles/**/*.scss',
        dist : DIST_DIR + 'css'
    },
    pug: {
        entry: SRC_DIR + 'pug/index.pug',
        src  : SRC_DIR + 'sections/**/*.pug',
        dist : DIST_DIR + '../'
    },
    sprite: {
        src  : SRC_DIR + 'img/icons/*.png',
        distImg : DIST_DIR + 'img',
        imgLocation: '../img/sprite.png',
        distfile: SRC_DIR + 'style/sprite'
    }
};

//tasks
gulp.task('sprite', () => {
    "use strict";
    var spriteData = gulp.src(
        path.sprite.src
    ).pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.scss',
        cssFormat: 'css',
        imgPath: path.sprite.imgLocation,
        padding: 70
    }));


    gulp.task('pug', () => {
        "use strict";
        return gulp.src(path.pug.entry)
            .pipe(pug({
                pretty: '\t'
            }))
            .pipe(gulp.dest(path.pug.dist))
    });

    spriteData.img.pipe(gulp.dest(path.sprite.distImg));
    spriteData.img.pipe(gulp.dest(path.sprite.distFile));

});

gulp.task('sass', function() {
    "use strict";
    return gulp.src(path.sass.entry)
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.sass.dist))
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('images/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
    }));
    return spriteData.pipe(gulp.dest('path/to/output/'));
});

//watch
gulp.task('watch', () => {
    "use strict";
    gulp.watch('src/pug/.pug', ['pug']);
    gulp.watch(path.sass.src, ['sass'])
});

//default
gulp.task('default', ['sass', 'pug', 'watch']);

