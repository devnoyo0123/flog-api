import { Test, TestingModule } from '@nestjs/testing';
import { FamiliesService } from './families.service';

describe('FamilyService', () => {
  let service: FamiliesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamiliesService],
    }).compile();

    service = module.get<FamiliesService>(FamiliesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
