import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImoveisModule } from './imoveis/imoveis.module';

@Module({
  imports: [ImoveisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
