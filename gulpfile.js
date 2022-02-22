const gulp = require("gulp"); // https://gulpjs.com/
const nunjucksRender = require("gulp-nunjucks-render"); // https://www.npmjs.com/package/gulp-nunjucks-render
const htmlmin = require("gulp-htmlmin"); // https://github.com/jonschlinkert/gulp-htmlmin

function render() {
	return gulp
		.src("src/*.html")
		.pipe(
			nunjucksRender({
				path: ["src/"], // String or Array
			})
		)
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("dist"));
}

exports.render = render;
