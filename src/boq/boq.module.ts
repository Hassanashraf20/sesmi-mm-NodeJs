import { Module } from '@nestjs/common';
import { BoqService } from './boq.service';
import { BoqController } from './boq.controller';

@Module({
  providers: [BoqService],
  controllers: [BoqController]
})
export class BoqModule {}
