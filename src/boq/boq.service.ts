import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { executeHttpRequest } from '@sap-cloud-sdk/http-client';
import { SapFetchService } from 'src/sap-fetch/sap-fetch.service';
import { BOQHeader } from './entities/BOQ-Header.entity';
import { Repository } from 'typeorm';
import { CreateBOQHeaderDto } from './DTO/boq-header.dto';

@Injectable()
export class BoqService {
  private readonly logger = new Logger(BoqService.name);
  constructor(
    @InjectRepository(BOQHeader)
    private readonly BOQRepository: Repository<BOQHeader>,
    private readonly configService: ConfigService,
    private readonly sapFetch: SapFetchService,
  ) {}

  async createBOQ(body: CreateBOQHeaderDto): Promise<any> {
    const boq = this.BOQRepository.create(body);
    if (!boq || !body) {
      throw new BadRequestException('No valid data provided');
    }
    const boqData = await this.BOQRepository.save(boq);
    return {
      msg: 'BOQ Added Succsesfully into HANA db',
      boqData,
    };
  }
  async findBoqbyId(boqId: string): Promise<any> {
    const boqData = await this.BOQRepository.findOne({ where: { boq: boqId } });
    if (!boqData) {
      throw new BadRequestException('No valid data provided');
    }
    return {
      msg: `BOQ retrived for: ${boqId}`,
      boqData,
    };
  }
  async getBoqSubItems(filters: any): Promise<any> {
    const filterString = this.buildODataBoqSubItemFilter(filters);
    const sapUrl = this.configService.get<string>('SAP_BASE_URL');
    const url = `${sapUrl}/BoqSubItemSet?$filter=${encodeURIComponent(filterString)}`;
    try {
      //   if (!filterString) {
      //     throw new InternalServerErrorException('No valid filters provided.');
      //   }

      const response = await executeHttpRequest(
        {
          url,
        },
        {
          method: 'GET',
          headers: this.sapFetch.getSapHeaders(),
        },
      );

      return response.data.d.results;
    } catch (error) {
      this.logger.error('Error fetching data from SAP S/4HANA', error);
      throw new InternalServerErrorException(
        'Failed to fetch BoqSubItemSet data.',
      );
    }
  }
  async getBoqTree(filters: any): Promise<any> {
    const filterString = this.buildOdataBoqTreeFilter(filters);
    const sapUrl = this.configService.get<string>('SAP_BASE_URL');
    const url = `${sapUrl}/BoqTreeSet?$filter=${encodeURIComponent(filterString)}`;
    try {
      const response = await executeHttpRequest(
        {
          url,
        },
        {
          method: 'GET',
          headers: this.sapFetch.getSapHeaders(),
        },
      );
      return response.data.d.results;
    } catch (error) {
      this.logger.error('Error fetching data from SAP S/4HANA', error);
      throw new InternalServerErrorException(
        'Failed to fetch BoqTreeSet data.',
      );
    }
  }
  private buildODataBoqSubItemFilter(filters: any[]): string {
    let filterConditions: string[] = [];

    for (let i = 0; i < filters.length; i++) {
      if (filters[i].ref) {
        let fieldName = filters[i].ref[0];
        let fieldValue = filters[i + 2]?.val;
        if (fieldValue !== undefined) {
          filterConditions.push(`${fieldName} eq '${fieldValue}'`);
        }
      } else if (filters[i].func === 'contains') {
        let fieldName = filters[i].args[0]?.ref[0];
        let fieldValue = filters[i].args[1]?.val;
        if (fieldName && fieldValue) {
          filterConditions.push(`substringof('${fieldValue}', ${fieldName})`);
        }
      }
    }

    return filterConditions.length > 0 ? filterConditions.join(' and ') : '';
  }

  private buildOdataBoqTreeFilter(filters: any[]): string {
    let filterConditions: string[] = [];

    for (let i = 0; i < filters.length; i++) {
      if (filters[i].ref) {
        let fieldName = filters[i].ref[0];
        let operator = filters[i + 1]?.val;
        let fieldValue = filters[i + 2]?.val;

        if (fieldValue !== undefined && operator) {
          const odataOperator = operator
            .replace('>=', 'ge')
            .replace('<=', 'le')
            .replace('=', 'eq');

          filterConditions.push(
            `${fieldName} ${odataOperator} '${fieldValue}'`,
          );
        }
      }
    }

    return filterConditions.length > 0 ? filterConditions.join(' and ') : '';
  }
}
