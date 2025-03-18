import {
  Body,
  Controller,
  Get,
  Post,
  Query,
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
  createContractPO(@Req() req) {
    return this.contractPoService.createContractPOHeader(req);
  }

  @Get('po-header')
  async getPOHeaders(@Query() query: any) {
    return this.contractPoService.GetPOHeader(query);
  }

  @Post('PO')
  async poExecuteAction(@Req() req: any) {
    console.log('Request controller', req.body);
    return await this.contractPoService.poExecuteAction(req);
  }
}
