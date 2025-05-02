import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CurrencyService } from './currency.service';

@ApiTags('Currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  @ApiOperation({ summary: 'Get currency data', description: 'Retrieves currency data for a vendor' })
  @ApiQuery({ name: 'vendor', type: 'string', required: true })
  @ApiResponse({ status: 200, description: 'Successfully retrieved currency data' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getCurrency(@Query('vendor') vendor: string) {
    return this.currencyService.getCurrency(vendor);
  }
}
