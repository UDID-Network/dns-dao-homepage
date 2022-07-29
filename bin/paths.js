const path = require('path');

module.exports = {
  isAbsolute: p => path.isAbsolute(p),
  R: (...p) => path.resolve(...p),
  join: (...p) => path.join(...p),
  dist: path.resolve(__dirname, '..', 'dist'),
  distZip: path.resolve(__dirname, '..', 'dist-zip'),
};
