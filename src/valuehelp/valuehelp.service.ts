import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { executeHttpRequest } from '@sap-cloud-sdk/http-client';

@Injectable()
export class ValuehelpService {
  private readonly logger = new Logger(ValuehelpService.name);

  constructor(private readonly configService: ConfigService) {}

  async getValueHelp(filters: any[]): Promise<any[]> {
    const filterString = this.parseFilters(filters);
    // if (!filterString) {
    //   throw new BadRequestException('No valid filters provided.');
    // }
    try {
      const sapUrl = this.configService.get<string>('SAP_BASE_URL');
      const url = `${sapUrl}/ValueHelpSet?$filter=${encodeURIComponent(filterString)}`;
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
      this.logger.error('SAP Request Failed', error.stack);
      throw new InternalServerErrorException(
        'Failed to fetch ValueHelpSet data',
      );
    }
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
  private parseFilters(filters: any[]): string {
    const filterConditions: string[] = [];

    for (let i = 0; i < filters.length; i++) {
      if (filters[i].ref) {
        const fieldName = filters[i].ref[0];
        const fieldValue = filters[i + 2]?.val;
        if (fieldValue !== undefined) {
          filterConditions.push(`${fieldName} eq '${fieldValue}'`);
        }
      } else if (filters[i].func === 'contains') {
        const fieldName = filters[i].args[0]?.ref[0];
        const fieldValue = filters[i].args[1]?.val;
        if (fieldName && fieldValue) {
          filterConditions.push(`substringof('${fieldValue}', ${fieldName})`);
        }
      }
    }
    return filterConditions.length > 0 ? filterConditions.join(' and ') : '';
  }
}
