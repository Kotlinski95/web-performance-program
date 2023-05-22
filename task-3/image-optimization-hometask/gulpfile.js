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