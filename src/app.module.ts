import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractPoModule } from './contract-po/contract-po.module';
import { ValuehelpModule } from './valuehelp/valuehelp.module';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [
    ContractPoModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sap',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      synchronize: false,
      encrypt: true,
      sslValidateCertificate: false,
      logging: ['query', 'error'],
      extra: {
        connectTimeout: 60000,
        requestTimeout: 60000,
      },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    ValuehelpModule,
    CurrencyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
