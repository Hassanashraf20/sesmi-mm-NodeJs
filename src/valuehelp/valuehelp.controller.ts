import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ValuehelpService } from './valuehelp.service';

@ApiTags('valuehelp')
@Controller('valuehelp')
export class ValueHelpController {
  constructor(private readonly valueHelpService: ValuehelpService) {}

  @Get()
  @ApiOperation({ summary: 'Get value help data' })
  @ApiResponse({ status: 200, description: 'Returns the value help data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getValueHelp(@Query() filters: any) {
    return this.valueHelpService.getValueHelp(filters);
  }
}
