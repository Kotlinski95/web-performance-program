// const sharp = require('sharp');
// const fs = require('fs');

// for (let i = 1; i <= 10; i++) {
//   const file = `images/image${i}.jpeg`;

//   fs.readFile(file, (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     sharp(data)
//       .resize(320, 240)
//       .toFile(`images/processed/image${i}.jpeg`, (err, info) => {
//         if (err) {
//           console.error(err);
//           return;
//         }
//         console.log(info);
//       });
//   });
// }




// const sharp = require('sharp');
// const fs = require('fs');
// const path = require('path');

// const directory = 'images';

// fs.readdir(directory, (err, files) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   files.forEach((file) => {
//     if (path.extname(file).toLowerCase() === '.jpeg') {
//       const inputFile = path.join(directory, file);
//       const outputFile = path.join(directory, 'processed', file);

//       fs.readFile(inputFile, (err, data) => {
//         if (err) {
//           console.error(err);
//           return;
//         }

//         sharp(data)
//           .resize(320, 240)
//           .toFile(outputFile, (err, info) => {
//             if (err) {
//               console.error(err);
//               return;
//             }
//             console.log(info);
//           });
//       });
//     }
//   });
// });


const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directory = 'images';
const outputDirectory = 'dist';

fs.readdir(directory, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }

  files.forEach((file) => {
    if (path.extname(file).toLowerCase() === '.jpeg') {
      const inputFile = path.join(directory, file);
      const outputFilePrefix = path.join(outputDirectory, path.parse(file).name);

      const sizes = [320, 768, 1024, 1920];

      sizes.forEach((size) => {
        const outputFile = `${outputFilePrefix}-${size}.webp`;

        sharp(inputFile)
          .resize(size)
          .toFormat('webp')
          .toFile(outputFile, (err, info) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(info);
          });
      
        const outputCompressedFile = `${outputFilePrefix}-${size}.jpeg`;
        sharp(inputFile)
          .resize(size)
          .jpeg({ quality: 80 })
          .toFile(outputCompressedFile, (err, info) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(info);
          });
      });
    }
  });
});

