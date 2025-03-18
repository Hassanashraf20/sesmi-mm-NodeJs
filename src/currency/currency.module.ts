import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { SapFetchModule } from 'src/sap-fetch/sap-fetch.module';

@Module({
  imports: [SapFetchModule],
  providers: [CurrencyService],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
