import { Test, TestingModule } from '@nestjs/testing';
import { FamiliesResolver } from './families.resolver';
import { FamiliesService } from './families.service';

describe('FamilyResolver', () => {
  let resolver: FamiliesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamiliesResolver, FamiliesService],
    }).compile();

    resolver = module.get<FamiliesResolver>(FamiliesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
