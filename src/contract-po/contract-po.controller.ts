import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ContractPoService } from './contract-po.service';
import { CreateContractPOHeaderDto } from './DTO/ContractPo.dto';

@Controller('contract')
export class ContractPoController {
  constructor(private readonly contractPoService: ContractPoService) {}

  @Post('po-header')
  createContractPO(@Req() req: any) {
    return this.contractPoService.createContractPOHeader(req);
  }

  @Get('po-header/:poHeader')
  async getPOHeaders(@Param('poHeader') Poheader: any) {
    return await this.contractPoService.GetPoNumber(Poheader);
  }

  @Post('po-execute')
  async poExecuteAction(@Req() req: any) {
    console.log('Request controller', req.body);
    return await this.contractPoService.poExecuteAction(req);
  }

  @Post('po-item')
  async createPoItem(@Req() req: any) {
    return await this.contractPoService.createContractPOItem(req.body);
  }

  @Post('po-srv-item')
  async createPoSrvItem(@Body() body: any) {
    return await this.contractPoService.createContractPOSrvItem(body);
  }

  @Post('po-note')
  async createPoNote(@Body() body: any) {
    return await this.contractPoService.createContractPONote(body);
  }
}
