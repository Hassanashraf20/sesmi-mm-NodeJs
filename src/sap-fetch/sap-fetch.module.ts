import { Module } from '@nestjs/common';
import { SapFetchService } from './sap-fetch.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [SapFetchService],
  exports: [SapFetchService],
})
export class SapFetchModule {}
