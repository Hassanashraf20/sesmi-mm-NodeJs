import {
  Injectable,
  InternalServerErrorException,
  LoggerService,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { executeHttpRequest } from '@sap-cloud-sdk/core';

@Injectable()
export class SapFetchService {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {}
  async fetchCsrfToken(): Promise<string> {
    try {
      const url = this.configService.get<string>('SAP_BASE_URL');
      console.log('url', url);
      if (!url) {
        throw new Error('SAP_BASE_URL is not defined in the configuration.');
      }

      const csrfResponse = await executeHttpRequest(
        { url },
        {
          method: 'GET',
          headers: {
            ...this.getSapHeaders(),
            'x-csrf-token': 'Fetch',
          },
        },
      );

      return csrfResponse.headers['x-csrf-token'];
    } catch (error) {
      this.logger.error('Error executing PO action:', error);
      throw new InternalServerErrorException('Failed to execute PO action.');
    }
  }
  getSapHeaders() {
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
