import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
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
  ],
})
export class DatabaseModule {}
