let project_folder="dist"
let source_folder="src"
let path={
build:{
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
},
src: {
    html: source_folder + "/*.html",
    css: source_folder + "/scss/style.css",
    js: source_folder + "/js/script.js",
    img: source_folder + "/img/**/*.{jpg,svg,png}",
},
watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.{scss,css}",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,svg,png}",
},
clean: "./" + project_folder + "/"
}

let {src, dest} = require('gulp'),
gulp = require('gulp'),
browsersync = require("browser-sync").create();
scss = require("gulp-sass")

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}


function js() {
    return src(path.src.js)
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}


function html() {
    return src(path.src.html)
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img)
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

function watchFiles(params) {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.img], images)
}

function css() {
    return src(path.src.css)
    .pipe(
        scss({
            outputStyle: "expanded"
        })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

let build = gulp.series(gulp.parallel(js, css, html, images));
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.images = images
exports.js = js
exports.css = css
exports.html = html
exports.build = build;
exports.watch = watch;
exports.default = watch;