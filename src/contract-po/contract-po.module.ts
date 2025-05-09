import { Module } from '@nestjs/common';
import { ContractPoService } from './contract-po.service';
import { ContractPoController } from './contract-po.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SapFetchModule } from 'src/sap-fetch/sap-fetch.module';
import { ContractPOHeader } from './entities/contractP0.entity';
import { ContractPOItem } from './entities/contractPOItem.entity';
import { ContractPOSrvItem } from './entities/contractPOSrvItem.entity';
import { OrderHeader } from './entities/orderHeader.entity';
import { OrderItems } from './entities/orderItems.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContractPOHeader,
      ContractPOItem,
      ContractPOSrvItem,
      OrderHeader,
      OrderItems,
    ]),
    SapFetchModule,
  ],
  providers: [ContractPoService],
  controllers: [ContractPoController],
  exports: [ContractPoService],
})
export class ContractPoModule {}
