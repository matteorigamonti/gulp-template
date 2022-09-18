const gulp = require("gulp"); // https://gulpjs.com/
const nunjucksRender = require("gulp-nunjucks-render"); // https://www.npmjs.com/package/gulp-nunjucks-render
const htmlmin = require("gulp-htmlmin"); // https://github.com/jonschlinkert/gulp-htmlmin
const sass = require("gulp-sass")(require("sass")); // https://www.npmjs.com/package/gulp-sass
const sourcemaps = require("gulp-sourcemaps"); // https://github.com/gulp-sourcemaps/gulp-sourcemaps
const imagemin = require("gulp-imagemin"); // https://www.npmjs.com/package/gulp-imagemin
const webp = require("gulp-webp"); // https://www.npmjs.com/package/gulp-webp

function htmlMin() {
	return gulp
		.src("./app/*.html")
		.pipe(
			nunjucksRender({
				path: ["app/"],
			})
		)
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("dist"));
}

function scss() {
	return gulp.src("./app/scss/**/*.scss").pipe(sourcemaps.init()).pipe(sass().on("error", sass.logError)).pipe(sourcemaps.write()).pipe(gulp.dest("./dist/css"));
}

function image() {
	return gulp
		.src("./app/img/**/*")
		.pipe(imagemin([imagemin.mozjpeg({ quality: 80, progressive: true })]))
		.pipe(webp())
		.pipe(gulp.dest("./dist/img"));
}

exports.scss = scss;
exports.htmlMin = htmlMin;
exports.image = image;

exports.watch = function () {
	gulp.watch("./app/scss/**/*.scss", scss);
};
