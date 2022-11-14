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
    // const LAUNCH_OPTION =
    //   process.env.ENV === 'LOCAL'
    //     ? { headless: false }
    //     : { args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=ja'] };
    const LAUNCH_OPTION = process.env.DYNO
      ? { args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=ja'] }
      : { headless: false };
    console.log(process.env.DYNO, 'process.env.DYNO');
    //ヘッドレスモードをオフにする(ブラウザが起動している様子が見えるようにする)
    const browser = await puppeteer.launch(LAUNCH_OPTION);
    const page = await browser.newPage();

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
