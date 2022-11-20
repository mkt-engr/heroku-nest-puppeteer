const { join } = require('path');
const os = require('os');
/**
 * @type {import("puppeteer").Configuration}
 */

const rootPath = process.env.DYNO ? __dirname : os.homedir();
console.log({ rootPath });
console.log('os.homedir()', os.homedir());
console.log('__dirname', __dirname);
module.exports = {
  // Changes the cache location for Puppeteer.
  // cacheDirectory: join(rootPath, '.cache', 'puppeteer'),
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
