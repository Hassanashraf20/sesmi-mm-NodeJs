import { Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ContractPoService } from './contract-po.service';
import { CreateContractPOHeaderDto } from './DTO/ContractPo.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('contract-po')
@Controller('contract-po')
export class ContractPoController {
  constructor(private readonly contractPoService: ContractPoService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new Contract PO Header',
    description: 'Endpoint to create a new Purchase Order contract header',
  })
  @ApiBody({ type: CreateContractPOHeaderDto })
  @ApiCreatedResponse({
    description: 'The contract PO header has been successfully created',
    type: CreateContractPOHeaderDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  createContractPO(@Req() req: any) {
    return this.contractPoService.createContractPOHeader(req);
  }

  @Get('po-header')
  @ApiOperation({
    summary: 'Get PO Headers',
    description: 'Retrieve purchase order headers with optional filtering',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search term to filter PO headers',
  })
  @ApiOkResponse({
    description: 'List of PO headers retrieved successfully',
    type: [CreateContractPOHeaderDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getPOHeaders(@Query() query: any) {
    return this.contractPoService.GetPOHeader(query);
  }

  @Post('PO')
  @ApiOperation({
    summary: 'Execute PO Action',
    description: 'Endpoint to perform specific actions on a Purchase Order',
  })
  @ApiBody({
    description: 'PO Action Request',
    schema: {
      type: 'object',
      required: ['PoNo', 'Decision', 'WorkitemId', 'ActionType'],
      properties: {
        PoNo: {
          type: 'string',
          description: 'Purchase Order number',
        },
        Decision: {
          type: 'string',
          description: 'Approval decision',
          enum: ['APPROVE', 'REJECT', 'RETURN'],
        },
        Notes: {
          type: 'string',
          description: 'Additional notes about the decision',
        },
        WorkitemId: {
          type: 'string',
          description: 'SAP workflow item ID',
        },
        CreationType: {
          type: 'string',
          description: 'Type of PO creation',
        },
        OrderNo: {
          type: 'string',
          description: 'Related order number',
        },
        ActionType: {
          type: 'string',
          description: 'Type of action being taken',
          enum: ['APPROVAL', 'REJECTION', 'RETURN'],
        },
        Comments: {
          type: 'string',
          description: 'Approver comments',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Action executed successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid action or parameters' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'PO not found' })
  async poExecuteAction(@Req() req: any) {
    console.log('Request controller', req.body);
    return await this.contractPoService.poExecuteAction(req);
  }
}
