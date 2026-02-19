import { Module } from '@nestjs/common';
import { EmailCadenceController } from './email-cadence.controller';
import { EmailCadenceService } from './email-cadence.service';

@Module({
  imports: [],
  controllers: [EmailCadenceController],
  providers: [EmailCadenceService],
})
export class EmailCadenceModule {}
