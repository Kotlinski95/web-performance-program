const path = require('path');
const SharpPlugin = require('sharp-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new SharpPlugin({
      files: [
        { from: './src/images/image1.jpg', to: 'images/[name].webp' },
        { from: './src/images/image2.jpg', to: 'images/[name].webp' },
        { from: './src/images/image3.jpg', to: 'images/[name].webp' }
      ],
      resize: {
        width: [320, 768, 1024, 1920]
      },
      format: 'webp'
    })
  ]
};
