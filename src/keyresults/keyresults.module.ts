import { Module } from '@nestjs/common';
import { KeyresultsController } from './keyresults.controller';
import { KeyresultsService } from './keyresults.service';
import { PrismaService } from '../prisma/prisma.service';
import { KeyresultsCompletionService } from './keyresults-completion.service';

@Module({
  controllers: [KeyresultsController],
  providers: [KeyresultsService, PrismaService, KeyresultsCompletionService],
})
export class KeyresultsModule {}
