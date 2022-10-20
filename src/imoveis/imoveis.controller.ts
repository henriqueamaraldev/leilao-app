import { Body, Controller, Get, Param } from '@nestjs/common';
import { ImoveisService } from './imoveis.service';
import { SearchOptions } from './utils/models/imovel';

@Controller('imoveis')
export class ImoveisController {
  constructor(private readonly imoveisService: ImoveisService) {}
  @Get('/:siglaEstado')
  async getList(
    @Param('siglaEstado') siglaEstado: string,
    @Body() searchOptions?: SearchOptions,
  ) {
    try {
      const imoveis = await this.imoveisService.listarImoveis(
        siglaEstado,
        searchOptions,
      );
      return imoveis;
    } catch (error) {
      console.log(error);
    }
  }
}
