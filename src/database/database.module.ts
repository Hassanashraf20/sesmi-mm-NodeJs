import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractTerms } from 'src/contract-terms/entities/contract-terms.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sap',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
        __dirname + '/../**/**/entities/*.entity{.ts,.js}',
      ],
      synchronize: false,
      encrypt: true,
      sslValidateCertificate: false,
      logging: ['query', 'error'],
    }),
  ],
})
export class DatabaseModule {}
