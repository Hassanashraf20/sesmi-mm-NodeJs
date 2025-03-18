import { Module } from '@nestjs/common';
import { SapFetchService } from './sap-fetch.service';

@Module({
  providers: [SapFetchService],
  exports: [SapFetchService],
})
export class SapFetchModule {}
