import { Module } from '@nestjs/common';
import { ContractPoService } from './contract-po.service';
import { ContractPoController } from './contract-po.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractPOHeader } from './contractP0.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContractPOHeader])],
  providers: [ContractPoService],
  controllers: [ContractPoController],
})
export class ContractPoModule {}
