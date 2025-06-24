import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { BoqService } from './boq.service';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiProduces,
  ApiConsumes,
} from '@nestjs/swagger';
import { CreateBOQHeaderDto } from './DTO/boq-header.dto';

@ApiTags('BOQ (Bill of Quantities)')
@ApiBearerAuth()
@ApiProduces('application/json')
@ApiConsumes('application/json')
@Controller('boq')
export class BoqController {
  constructor(private readonly boqSubItemService: BoqService) {}

  @Post('create-boq')
  async createBoq(@Body() body: CreateBOQHeaderDto) {
    return await this.boqSubItemService.createBOQ(body);
  }
  @Get('/:boq')
  async findBoq(@Param('boq') boqId: string) {
    return await this.boqSubItemService.findBoqbyId(boqId);
  }

  @Get('itemset')
  @ApiOperation({
    summary: 'Get BOQ Items',
    description:
      'Retrieves BOQ items with optional filtering. Filters should be provided as a JSON string.',
  })
  @ApiQuery({
    name: 'filters',
    required: false,
    type: String,
    description: 'JSON string of filter criteria',
    example: '[{"field": "itemCode", "operator": "contains", "value": "CONC"}]',
    schema: {
      example: [
        {
          field: 'itemCode',
          operator: 'contains',
          value: 'CONC',
        },
        {
          field: 'status',
          operator: 'equals',
          value: 'ACTIVE',
        },
      ],
    },
  })
  @ApiOkResponse({
    description: 'Array of BOQ items retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          itemCode: { type: 'string' },
          description: { type: 'string' },
          unit: { type: 'string' },
          quantity: { type: 'number' },
          rate: { type: 'number' },
          amount: { type: 'number' },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid filters format',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Invalid filters format.' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  async getBoqSubItems(@Query('filters') filters: string) {
    try {
      const parsedFilters = filters ? JSON.parse(filters) : [];
      return await this.boqSubItemService.getBoqSubItems(parsedFilters);
    } catch (error) {
      throw new BadRequestException('Invalid filters format.');
    }
  }

  @Get('tree')
  @ApiOperation({
    summary: 'Get BOQ Tree Structure',
    description:
      'Retrieves BOQ items in a hierarchical tree structure with optional filtering.',
  })
  @ApiQuery({
    name: 'filters',
    required: false,
    type: String,
    description: 'JSON string of filter criteria for tree nodes',
    example: '[{"field": "parentId", "operator": "equals", "value": "root"}]',
    schema: {
      example: [
        {
          field: 'level',
          operator: 'lte',
          value: 3,
        },
      ],
    },
  })
  @ApiOkResponse({
    description: 'BOQ tree structure retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          label: { type: 'string' },
          children: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                label: { type: 'string' },
                itemCode: { type: 'string' },
                isLeaf: { type: 'boolean' },
              },
            },
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid filters format',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Invalid filters format.' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  async getBoqTree(@Query('filters') filters: string) {
    try {
      const parsedFilters = filters ? JSON.parse(filters) : [];
      return await this.boqSubItemService.getBoqTree(parsedFilters);
    } catch (error) {
      throw new BadRequestException('Invalid filters format.');
    }
  }
}
