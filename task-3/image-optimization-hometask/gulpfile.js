// const gulp = require('gulp');
// const sharp = require('sharp');

// gulp.task('images', function () {
//   return gulp.src('images/*.{jpeg,png}')
//     .pipe(sharp([
//       { width: 320, rename: { suffix: '-320' } },
//       { width: 768, rename: { suffix: '-768' } },
//       { width: 1024, rename: { suffix: '-1024' } },
//       { width: 1920, rename: { suffix: '-1920' } },
//     ], { withoutEnlargement: true })
//     .webp({ quality: 90 }))
//     .pipe(gulp.dest('dist/images'));
// });

// gulp.task('default', gulp.series('images'));

const { src, dest } = require('gulp');
const sharp = require('sharp');

function resizeAndConvert() {
  return src('images/*.jpeg')
    .pipe(
      sharp({
        failOnError: false,
      })
        .resize(320)
        .toFormat('webp')
    )
    .pipe(dest('dist/images'));
}

exports.default = resizeAndConvert;