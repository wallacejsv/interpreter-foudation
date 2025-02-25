import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';

const sass = gulpSass(dartSass);
const bs = browserSync.create();

// Caminhos
const paths = {
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css'
    },
    fonts: {
        src: 'assets/fonts/**/*',
        dest: 'dist/fonts'
    },
    html: {
        src: '*.html'
    }
};

// Compilação do SASS
function styles() {
    return gulp.src('src/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['node_modules', 'src/scss'],
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(bs.stream());
}

// Copiar fontes
function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}

// Servidor de desenvolvimento
function serve() {
    bs.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.fonts.src, fonts);
    gulp.watch(paths.html.src).on('change', bs.reload);
}

// Exports
export { styles, fonts, serve };
export default serve; 