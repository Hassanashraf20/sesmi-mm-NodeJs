import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { executeHttpRequest } from '@sap-cloud-sdk/http-client';

@Injectable()
export class BoqService {
  private readonly logger = new Logger(BoqService.name);

  constructor(private readonly configService: ConfigService) {}

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
          headers: this.getSapHeaders(),
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
          headers: this.getSapHeaders(),
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

  private getSapHeaders() {
    return {
      Cookie: `sap-usercontext=sap-client=${this.configService.get('SAP_CLIENT')}`,
      Authorization:
        'Basic ' +
        Buffer.from(
          `${this.configService.get('SAP_USERNAME')}:${this.configService.get('SAP_PASSWORD')}`,
        ).toString('base64'),
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }
}
