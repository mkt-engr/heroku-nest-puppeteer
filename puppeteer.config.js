const { join } = require('path');
const os = require('os');
/**
 * @type {import("puppeteer").Configuration}
 */

const rootPath = process.env.ENV === 'LOCAL' ? os.homedir() : __dirname;
// console.log(os.homedir(), 'os.homedir()');
// console.log(__dirname, '__dirname');
module.exports = {
  // Changes the cache location for Puppeteer.
  // cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
  cacheDirectory: join(rootPath, '.cache', 'puppeteer'),
};
