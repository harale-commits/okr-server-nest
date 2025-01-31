import { Test, TestingModule } from '@nestjs/testing';
import { ObjectivesService } from './objectives.service';
import { PrismaService } from '../prisma/prisma.service';
import { mockDeep } from 'jest-mock-extended';

describe('ObjectivesService', () => {
  let service: ObjectivesService;
  let prismaService = mockDeep<PrismaService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObjectivesService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    service = module.get<ObjectivesService>(ObjectivesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getObjectives', () => {
    it('should return objectives', async () => {
      let dummyKeyResult = {
        id: 1,
        title: 'dummy key result',
        initialValue: 1,
        currentValue: 2,
        targetValue: 3,
        metrics: 'dummy metrics',
        objectiveID: 1,
      };

      let dummyObjective = {
        id: 1,
        title: 'dummy objective',
        keyResults: [dummyKeyResult],
      };

      prismaService.objective.findMany.mockResolvedValue([dummyObjective]);

      const response = await service.getObjectives();

      expect(response).toEqual([dummyObjective]);
    });
  });
});
