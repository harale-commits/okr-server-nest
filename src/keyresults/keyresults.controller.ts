import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { KeyresultsService } from './keyresults.service';
import { CreateKeyresultDto } from './create-keyresult.dto';
import { CreateObjectiveDto } from '../objectives/create-objective.dto';
import { KeyresultsCompletionService } from './keyresults-completion.service';

@Controller('keyresults')
export class KeyresultsController {
  constructor(
    private keyresultService: KeyresultsService,
    private keyresultCompletionService: KeyresultsCompletionService,
  ) {}

  @Get('/')
  getKeyResults() {
    return this.keyresultService.getAll();
  }

  @Get(':id')
  fetchUnique(@Param('id') id: string) {
    return this.keyresultService.fetchUnique(Number(id));
  }

  @Post('/')
  createKeyResult(@Body() dto: CreateKeyresultDto) {
    return this.keyresultService.create(dto);
  }

  @Patch(':id')
  updateKeyResult(@Param('id') id: string, @Body() dto: CreateKeyresultDto) {
    return this.keyresultService.update(id, dto);
  }

  @Delete(':id')
  deleteKeyResult(@Param('id') id: string) {
    return this.keyresultService.delete(id);
  }

  @Post('/is-keyresult-completed')
  isComplete(@Body() dto: CreateKeyresultDto) {
    return this.keyresultCompletionService.isCompleted(dto);
  }
}
