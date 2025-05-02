import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractPoModule } from './contract-po/contract-po.module';
import { ValuehelpModule } from './valuehelp/valuehelp.module';
import { CurrencyModule } from './currency/currency.module';
import { BoqModule } from './boq/boq.module';
import { SapFetchModule } from './sap-fetch/sap-fetch.module';
import { DatabaseModule } from './database/database.module';
import { ContractTermsModule } from './contract-terms/contract-terms.module';

@Module({
  imports: [
    ContractPoModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ValuehelpModule,
    CurrencyModule,
    BoqModule,
    SapFetchModule,
    DatabaseModule,
    ContractTermsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
