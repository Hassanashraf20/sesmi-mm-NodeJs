import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  async getCurrency(@Query('Vendor') vendor: string) {
    return this.currencyService.getCurrency(vendor);
  }
}
