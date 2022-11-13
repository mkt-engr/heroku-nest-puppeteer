import { Injectable } from '@nestjs/common';
import { CreatePuppeteerDto } from './dto/create-puppeteer.dto';
import { UpdatePuppeteerDto } from './dto/update-puppeteer.dto';
import puppeteer from 'puppeteer';

@Injectable()
export class PuppeteerService {
  create(createPuppeteerDto: CreatePuppeteerDto) {
    return 'This action adds a new puppeteer';
  }

  async findAll() {
    console.log('環境変数', process.env.ENV);
    //Chronium起動オプション
    const LAUNCH_OPTION =
      process.env.ENV === 'LOCAL'
        ? { headless: false }
        : { args: ['--no-sandbox', '--disable-setuid-sandbox'] };

    //ヘッドレスモードをオフにする(ブラウザが起動している様子が見えるようにする)
    const browser = await puppeteer.launch(LAUNCH_OPTION);
    const page = await browser.newPage();

    await page.goto('https://developers.google.com/web/');

    // Type into search box.
    await page.type('.devsite-search-field', 'Headless Chrome');

    // Wait for suggest overlay to appear and click "show all results".
    const allResultsSelector = '.devsite-suggest-all-results';
    await page.waitForSelector(allResultsSelector);
    await page.click(allResultsSelector);

    // Wait for the results page to load and display the results.
    const resultsSelector = '.gsc-results .gs-title';
    await page.waitForSelector(resultsSelector);

    // Extract the results from the page.
    const links = await page.evaluate((resultsSelector) => {
      return [...document.querySelectorAll(resultsSelector)].map(
        (anchor: HTMLAnchorElement) => {
          const title = anchor.textContent.split('|')[0].trim();
          return `${title} - ${anchor.href}`;
        },
      );
    }, resultsSelector);

    // Print all the files.
    // console.log(links.join('\n'));

    await browser.close();
    return { links };
  }

  findOne(id: number) {
    return `This action returns a #${id} puppeteer`;
  }

  update(id: number, updatePuppeteerDto: UpdatePuppeteerDto) {
    return `This action updates a #${id} puppeteer`;
  }

  remove(id: number) {
    return `This action removes a #${id} puppeteer`;
  }
}
