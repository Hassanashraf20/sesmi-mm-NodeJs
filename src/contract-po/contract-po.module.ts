import { Module } from '@nestjs/common';
import { ContractPoService } from './contract-po.service';
import { ContractPoController } from './contract-po.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractPOHeader } from './contractP0.entity';
import { SapFetchModule } from 'src/sap-fetch/sap-fetch.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContractPOHeader]), SapFetchModule],
  providers: [ContractPoService],
  controllers: [ContractPoController],
})
export class ContractPoModule {}
