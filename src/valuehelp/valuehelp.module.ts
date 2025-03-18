import { Module } from '@nestjs/common';
import { ValuehelpService } from './valuehelp.service';
import { ValueHelpController } from './valuehelp.controller';
import { ConfigModule } from '@nestjs/config';
import { SapFetchModule } from 'src/sap-fetch/sap-fetch.module';

@Module({
  imports: [SapFetchModule],
  providers: [ValuehelpService],
  controllers: [ValueHelpController],
})
export class ValuehelpModule {}
