import { Module } from '@nestjs/common';
import { ValuehelpService } from './valuehelp.service';
import { ValueHelpController } from './valuehelp.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ValuehelpService],
  controllers: [ValueHelpController],
})
export class ValuehelpModule {}
