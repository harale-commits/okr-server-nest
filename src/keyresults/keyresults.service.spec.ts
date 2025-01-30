import { KeyresultsService } from './keyresults.service';
import { PrismaService } from '../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateKeyresultDto } from './create-keyresult.dto';
import { CreateObjectiveDto } from '../objectives/create-objective.dto';
import { mockDeep } from 'jest-mock-extended';

describe('keyresultService', () => {
  let service: KeyresultsService;
  let prismaService = mockDeep<PrismaService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KeyresultsService,
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    service = module.get<KeyresultsService>(KeyresultsService);
  });

  describe('fetchUnique', () => {
    it('should return an unique key result', async () => {
      const keyResult: CreateKeyresultDto = {
        title: 'Dummy Key Result',
        initialValue: 1,
        currentValue: 2,
        targetValue: 3,
        metrics: 'dummy metric',
        objectiveID: 1,
      };

      prismaService.keyResult.findUnique.mockResolvedValue({
        id: 1,
        ...keyResult,
      });
      const response = await service.fetchUnique(1);

      expect(response).toEqual({ ...keyResult, id: 1 });
    });
  });

  describe('create keyresult', () => {
    it('should return created keyresult with id', async () => {
      const dummyKeyResult: CreateKeyresultDto = {
        title: 'dummy keyresult',
        initialValue: 1,
        currentValue: 2,
        targetValue: 3,
        metrics: 'dummy metrics',
        objectiveID: 1,
      };

      const mockKeyResult = {
        id: 1,
        ...dummyKeyResult,
      };

      prismaService.keyResult.create.mockResolvedValue(mockKeyResult);

      const response = await service.create(dummyKeyResult);
      expect(response).toEqual(mockKeyResult);
    });
  });
});
