var gulp    = require('gulp'),
    clean = require('gulp-clean'),
    concat  = require('gulp-concat'),
    typescript = require('gulp-tsc');

gulp.task('clean', function () {
    return gulp.src('./build/**/*.*', {read: false})
        .pipe(clean());
});


gulp.task('default', ['clean'], function() {
    
    //select all *.ts files in src/ dir
    gulp.src('./src/**/*.ts')
        //run typescript compiler
        .pipe(typescript({ 
            //sourcemap: true, 
            //declaration: true,
            out: 'canvasApp-dev.js',
            outDir: 'build/tsc/'
        }))
        //concat all generated js
        //.pipe(concat('houseJS-dev.js'))
        //save concated file to build/ dir
        .pipe(gulp.dest('./build/'))
});