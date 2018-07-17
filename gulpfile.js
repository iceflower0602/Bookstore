var gulp = require('gulp');
var server = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('server', function() {
    gulp.src(src())
        .pipe(server({
            port: 8080,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/api/list') {
                    res.end(JSON.stringify({code: 1, data: list}))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})
gulp.task('devCss', function() {
    gulp.src('src/scss/*.scss')
        .pipe(autoprefixer({
            browsers:['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(gulp.dest('./src/css'))
})
gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss',['devCss'])
})
gulp.task('dev',['server','devCss']);