import { Injectable } from '@nestjs/common';
import { CreateKeyresultDto } from './create-keyresult.dto';

@Injectable()
export class KeyresultsCompletionService {
  isCompleted(keyResultDto: CreateKeyresultDto) {
    return keyResultDto.currentValue >= keyResultDto.targetValue;
  }
}
