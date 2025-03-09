import {
  Body,
  Controller,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContractPoService } from './contract-po.service';
import { CreateContractPOHeaderDto } from './DTO/ContractPo.dto';

@Controller('contract-po')
export class ContractPoController {
  constructor(private readonly contractPoService: ContractPoService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  createContractPO(
    @Req() req,
    @Body() createContractPODto: CreateContractPOHeaderDto,
  ) {
    return this.contractPoService.createContractPOHeader(
      req,
      createContractPODto,
    );
  }
}
