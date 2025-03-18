import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { BoqService } from './boq.service';

@Controller('boq')
export class BoqController {
  constructor(private readonly boqSubItemService: BoqService) {}
  @Get('itemset')
  async getBoqSubItems(@Query('filters') filters: string) {
    try {
      const parsedFilters = filters ? JSON.parse(filters) : [];

      return await this.boqSubItemService.getBoqSubItems(parsedFilters);
    } catch (error) {
      throw new BadRequestException('Invalid filters format.');
    }
  }

  @Get('tree')
  async getBoqTree(@Query('filters') filters: string) {
    try {
      const parsedFilters = filters ? JSON.parse(filters) : [];

      return await this.boqSubItemService.getBoqTree(parsedFilters);
    } catch (error) {
      throw new BadRequestException('Invalid filters format.');
    }
  }
}
