const path = require('path');
const rootPath = process.cwd();

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  pkgPath: path.resolve(rootPath, 'package.json'),
  isProduction
};