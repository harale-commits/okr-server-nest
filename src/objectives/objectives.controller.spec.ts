import { Test, TestingModule } from '@nestjs/testing';
import { ObjectivesController } from './objectives.controller';
import { ObjectivesService } from './objectives.service';
import { mockDeep } from 'jest-mock-extended';
import { CreateObjectiveDto } from './create-objective.dto';
import { CreateKeyresultDto } from '../keyresults/create-keyresult.dto';

describe('ObjectivesController', () => {
  let controller: ObjectivesController;
  let service = mockDeep<ObjectivesService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObjectivesController],
      providers: [
        ObjectivesService,
        {
          provide: ObjectivesService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<ObjectivesController>(ObjectivesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getObjectives', () => {
    it('should return objectives', async () => {
      let dummyObjective: CreateObjectiveDto = {
        title: 'dummyObjective',
      };

      service.getObjectives.mockResolvedValue([{ id: 1, ...dummyObjective }]);

      const response = await controller.getObjectives();
      console.log(response);
      expect(response).toEqual([{ id: 1, ...dummyObjective }]);
    });
  });

  describe('getObjectivesAndKeyResults', () => {
    it('should return objectives with keyresults', async () => {
      let dummyKeyResult = {
        id: 1,
        title: 'dummy key result',
        initialValue: 1,
        currentValue: 2,
        targetValue: 3,
        metrics: 'dummy metricd',
        objectiveID: 1,
      };

      let dummyObjective = {
        id: 1,
        title: 'dummy objective',
        keyResults: [dummyKeyResult],
      };

      service.getObjectivesAndKeyResults.mockResolvedValue([dummyObjective]);

      const response = await controller.getObjectivesAndKeyResults();

      expect(response).toEqual([dummyObjective]);
    });
  });
});
