const { join } = require('path');
const os = require('os');
/**
 * @type {import("puppeteer").Configuration}
 */

const rootPath = process.env.DYNO ? __dirname : os.homedir();
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(rootPath, '.cache', 'puppeteer'),
};
