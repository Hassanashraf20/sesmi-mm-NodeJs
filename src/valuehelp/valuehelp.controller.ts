import { Controller, Get, Query } from '@nestjs/common';
import { ValuehelpService } from './valuehelp.service';

@Controller('valuehelp')
export class ValueHelpController {
  constructor(private readonly valueHelpService: ValuehelpService) {}

  @Get()
  async getValueHelp(@Query('filters') filters?: string) {
    const parsedFilters = filters ? JSON.parse(filters) : [];

    return await this.valueHelpService.getValueHelp(parsedFilters);
  }
}
