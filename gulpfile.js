var 	gulp       = require('gulp'),
    gutil              = require('gulp-util'),
    sass               = require('gulp-sass'),
    browserSync        = require('browser-sync'),
    concat             = require('gulp-concat'),
    uglify             = require('gulp-uglify'),
    jsonminify         = require('gulp-jsonminify'),
    cleanCSS           = require('gulp-clean-css'),
    rename             = require('gulp-rename'),
    del                = require('del'),
    imagemin           = require('gulp-imagemin'),
    cache              = require('gulp-cache'),
    autoprefixer       = require('gulp-autoprefixer'),
    bourbon            = require('node-bourbon'),
    ftp                = require('vinyl-ftp'),
    notify             = require("gulp-notify"),
    historyApiFallback = require('connect-history-api-fallback');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app",
            middleware: [ historyApiFallback() ]
        }
    });
});

gulp.task('json-minify', function () {
    return gulp.src(['app/json/*.json'])
        .pipe(jsonminify())
        .pipe(gulp.dest('dist/json'));
});

gulp.task('scripts', function() {
    return gulp.src([
        'app/libs/jquery/jquery-3.2.1.slim.min.js',
        'app/libs/angularjs/angular.min.js',
        'app/libs/angularjs/angular.route.min.js',
        'app/libs/bootstrap/js/bootstrap.min.js',
        'app/js/app.js',
        'app/js/app-config.js',
        'app/js/controller/mainController.js'
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function() {
    return gulp.src('app/style/sass/*.sass')
        .pipe(sass({
            includePaths: bourbon.includePaths
        }).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS())
        .pipe(gulp.dest('app/style/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('imagemin', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['sass', 'scripts', 'browser-sync'], function() {
    gulp.watch('app/style/sass/*.sass', ['sass']);
    gulp.watch('app/js/scripts.min.js', ['scripts']);
    gulp.watch('app/js/controller/*.js', browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'scripts'], function() {

    var buildFiles = gulp.src([
        'app/*.html',
        'app/.htaccess'
    ]).pipe(gulp.dest('dist'));

    var buildView = gulp.src([
        'app/view/*.html'
    ]).pipe(gulp.dest('dist/view'));

    var buildLibsBootstrapFonts = gulp.src([
        'app/libs/bootstrap/fonts/*'
    ]).pipe(gulp.dest('dist/libs/bootstrap/fonts'));

    var buildCss = gulp.src([
        'app/style/css/*.css',
    ]).pipe(gulp.dest('dist/style/css'));

    var buildJs = gulp.src([
        'app/js/scripts.min.js'
    ]).pipe(gulp.dest('dist/js'));

    var buildFonts = gulp.src([
        'app/style/fonts/**/*']
    ).pipe(gulp.dest('dist/style/fonts'));

});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch', 'browser-sync']);