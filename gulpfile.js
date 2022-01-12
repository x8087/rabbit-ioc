'use strict';
const gulp = require("gulp");
const minify = require('gulp-minify');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const inject = require('gulp-inject-string');
const babel = require("gulp-babel");

gulp.task('buildJs', () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(inject.replace('var com;', ''))
        .pipe(inject.prepend('window.com = {};\nwindow.c = window.com;\n'))
        // .pipe(inject.prepend('window.inject = null'))
        .pipe(inject.replace('var __extends', 'window.__extends'))
        // .pipe(babel())
        // .pipe(minify({ ext: { min: ".min.js" } }))
        .pipe(gulp.dest('D:/IMChats/IMClient/IMChat/assets/Script/libs'));
})

gulp.task("buildDts", () => {
    return tsProject.src()
        .pipe(tsProject())
        .dts.pipe(inject.append('import c = com;'))
        .pipe(gulp.dest('D:/IMChats/IMClient/IMChat/assets/Script/libs'));
});

gulp.task("copy", () => {
    return gulp.src('bin/**/*')
        .pipe(gulp.dest('../demo/assets/Script/Lib/'))
});

gulp.task('build', gulp.series(
    gulp.parallel('buildJs'),
    gulp.parallel('buildDts'),
    gulp.parallel('copy')
)
)
