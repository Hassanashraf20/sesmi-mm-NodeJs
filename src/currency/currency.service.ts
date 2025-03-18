import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { executeHttpRequest } from '@sap-cloud-sdk/http-client';

@Injectable()
export class CurrencyService {
  private readonly logger = new Logger(CurrencyService.name);

  constructor(private readonly configService: ConfigService) {}

  async getCurrency(vendor: string) {
    console.log('hereeer');
    const sapUrl = this.configService.get<string>('SAP_BASE_URL');
    const url = `${sapUrl}/GetCurrencyExecuteAction?Vendor='${vendor}'`;
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
      console.log(response.data);
      return { Currency: response.data.d.Currency };
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
}
