import { Injectable } from '@nestjs/common';
import { imovel, SearchOptions } from './utils/models/imovel';
import { scrapper } from './utils/puppeteer';
import { SortBy } from './utils/sort';
@Injectable()
export class ImoveisService {
  async listarImoveis(
    siglaEstado: string,
    searchOptions?: SearchOptions,
  ): Promise<imovel[]> {
    let data: imovel[] = await scrapper(siglaEstado);
    if (searchOptions.filter) {
      const { region, city, description } = searchOptions.filter;
      if (region) {
        data = data.filter((item) =>
          item.bairro.toLowerCase().includes(region.toLowerCase()),
        );
      }
      if (city) {
        data = data.filter((item) =>
          item.cidade.toLowerCase().includes(city.toLowerCase()),
        );
      }
      if (description) {
        data = data.filter((item) =>
          item.descricao.toLowerCase().includes(description.toLowerCase()),
        );
      }
    }
    if (searchOptions.options) {
      const { page, sort, sortBy } = searchOptions.options;
      data = SortBy(data, sortBy, sort);
      data = data.slice((page - 1) * 50, page * 50);
    }

    return data;
  }
}
