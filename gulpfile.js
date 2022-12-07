const { src, dest, watch, parallel } = require('gulp'); 

const scss         = require('gulp-sass')(require('sass'));
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default;
const browserSync  = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'src/'
        }
    });
}

function styles() {
    return src([
        'node_modules/swiper/swiper-bundle.css',
        'node_modules/normalize.css/normalize.css',
        'src/scss/style.scss'
        ])
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('src/css'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src([
        'node_modules/swiper/swiper-bundle.js',
        'src/js/script.js'
        ])
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(dest('src/js'))
        .pipe(browserSync.stream())
}

function watching() {
    watch(['src/scss/**/*.scss'], styles);
    watch(['src/js/**/*.js', '!src/js/script.min.js'], scripts);
    watch(['src/*.html']).on('change', browserSync.reload)
}

function build() {
    return src([
        'src/css/style.min.css',
        'src/fonts/**/*',
        'src/js/script.min.js',
        'src/*.html'
    ], {base: 'src'})
    .pipe(dest('dist'))
}

exports.build       = build;
exports.styles      = styles;
exports.scripts     = scripts;
exports.watching    = watching;
exports.browsersync = browsersync;

exports.default = parallel(styles, scripts, browsersync, watching);