import { Module } from '@nestjs/common';
import { ImoveisController } from './imoveis.controller';
import { ImoveisService } from './imoveis.service';

@Module({
  controllers: [ImoveisController],
  providers: [ImoveisService],
})
export class ImoveisModule {}
