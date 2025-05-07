import { Module } from '@nestjs/common';
import { ContractTermsController } from './contract-terms.controller';
import { ContractTermsService } from './contract-terms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractTerms } from './entities/contract-terms.entity';
import { ContractPoModule } from 'src/contract-po/contract-po.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContractTerms]), ContractPoModule],
  controllers: [ContractTermsController],
  providers: [ContractTermsService],
})
export class ContractTermsModule {}
