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
    console.log(process.env.DYNO, 'dddd');
    const LAUNCH_OPTION = process.env.DYNO
      ? { args: ['--no-sandbox', '--disable-set/uid-sandbox'] }
      : {
          headless: false,
        };
    console.log(process.env.DYNO, 'process.env.DYNO');
    //ヘッドレスモードをオフにする(ブラウザが起動している様子が見えるようにする)
    const browser = await puppeteer.launch(LAUNCH_OPTION);
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'ja',
    });
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'language', {
        get: function () {
          return 'ja';
        },
      });
      Object.defineProperty(navigator, 'languages', {
        get: function () {
          return ['ja'];
        },
      });
    });
    // Googleページを開く
    await page.goto('https://www.google.com/');
    // 検索boxに`puppeteer`を入力
    await page.type('input[name="q"]', 'puppeteer');
    // 「Enter」ボタン押下
    await page.keyboard.press('Enter');
    // 検索結果要素の表示まで待機
    await page.waitForSelector('.LC20lb', { visible: true });
    // 検索結果のタイトル・リンク一覧取得
    const searchResults = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLAnchorElement>('.LC20lb')].map(
        (element) => {
          const ppp = element.parentElement as HTMLAnchorElement;
          return {
            link: element.href || ppp.href || '何もなかった',
            title: element.innerText,
          };
        },
      ),
    );

    console.log(searchResults);
    await browser.close();
    return { searchResults };
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
