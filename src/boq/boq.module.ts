import { Module } from '@nestjs/common';
import { BoqService } from './boq.service';
import { BoqController } from './boq.controller';
import { SapFetchModule } from 'src/sap-fetch/sap-fetch.module';

@Module({
  imports: [SapFetchModule],
  providers: [BoqService],
  controllers: [BoqController],
})
export class BoqModule {}
