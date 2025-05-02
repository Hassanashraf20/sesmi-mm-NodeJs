import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { executeHttpRequest } from '@sap-cloud-sdk/http-client';
import { SapFetchService } from 'src/sap-fetch/sap-fetch.service';

@Injectable()
export class CurrencyService {
  private readonly logger = new Logger(CurrencyService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly sapFetch: SapFetchService,
  ) {}
  async getCurrency(vendor: string) {
    const sapUrl = this.configService.get<string>('SAP_BASE_URL');
    const url = `${sapUrl}/GetCurrencyExecuteAction?Vendor='${vendor}'`;
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
      console.log(response.data);
      return { Currency: response.data.d.Currency };
    } catch (error) {
      this.logger.error('SAP Request Failed', error.stack);
      throw new InternalServerErrorException(
        'Failed to fetch ValueHelpSet data',
      );
    }
  }
}
