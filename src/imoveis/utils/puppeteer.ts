import * as puppeteer from 'puppeteer';
import { readdir, readFile, writeFile } from 'fs/promises';
import * as moment from 'moment';
import { basename } from 'path';
import { imovel } from './models/imovel';

const cwd = __dirname;

const scrapper = async (siglaEstado: string): Promise<imovel[]> => {
  const baseFileNames = (await readdir(`${cwd}/data`)).map((item) =>
    basename(item, '.json'),
  );
  const now = moment();

  const hasRecentDataFile = baseFileNames.find((file) => {
    const momentFile = moment.unix(Number(file));
    return now.diff(momentFile, 'minutes') <= 30;
  });

  if (hasRecentDataFile) {
    const item = await readFile(`${cwd}/data/${hasRecentDataFile}.json`);
    return JSON.parse(item.toString());
  }
  const RESOURCE_URL = `https://venda-imoveis.caixa.gov.br/listaweb/Lista_imoveis_${siglaEstado}.htm`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(RESOURCE_URL);

  const data = await page.evaluate(() => {
    const firstLine = document.querySelector('table tr');
    const tds = Array.from(firstLine.querySelectorAll('td'));
    const headers = tds.map((item) =>
      item.innerText
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ /g, '_')
        .replace(/\(.*\)/, '')
        .toLowerCase(),
    );

    const body = Array.from(document.querySelectorAll('table tr'));
    body.shift();

    const isPrice = new RegExp(/(^[\d^.|^,]+)/);
    return body
      .map((item) =>
        Array.from(item.querySelectorAll('td')).map(
          (column) => column.innerText,
        ),
      )
      .map((columnData) => {
        console.log(columnData);
        const extractData = {};
        columnData.forEach((el, key) => {
          if (isPrice.test(el)) {
            extractData[headers[key]] = Number(
              el.replace('.', '').replace(',', '.'),
            );
          } else {
            extractData[headers[key]] = el;
          }
        });

        return extractData;
      });
  });

  await writeFile(`${cwd}/data/${now.unix()}.json`, JSON.stringify(data));
  await browser.close();
  return data as imovel[];
};

export { scrapper };
