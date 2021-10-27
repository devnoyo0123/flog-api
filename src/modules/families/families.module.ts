import { Module } from '@nestjs/common';
import { FamiliesService } from './families.service';
import { FamiliesResolver } from './families.resolver';

@Module({
  providers: [FamiliesResolver, FamiliesService],
})
export class FamiliesModule {}
