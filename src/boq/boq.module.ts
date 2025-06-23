import { Module } from '@nestjs/common';
import { BoqService } from './boq.service';
import { BoqController } from './boq.controller';
import { SapFetchModule } from 'src/sap-fetch/sap-fetch.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BOQHeader } from './entities/BOQ-Header.entity';
import { SRVDesc } from './entities/SRV-Desc.entity';

@Module({
  imports: [SapFetchModule, TypeOrmModule.forFeature([BOQHeader, SRVDesc])],
  providers: [BoqService],
  controllers: [BoqController],
})
export class BoqModule {}
