import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FamiliesService } from './families.service';
import { Family } from './entities/families.entity';
import { CreateFamilyInput } from './dto/create-family.input';
import { UpdateFamilyInput } from './dto/update-family.input';

@Resolver(() => Family)
export class FamiliesResolver {
  constructor(private readonly familyService: FamiliesService) {}

  @Mutation(() => Family)
  createFamily(
    @Args('createFamilyInput') createFamilyInput: CreateFamilyInput,
  ) {
    return this.familyService.create(createFamilyInput);
  }

  @Query(() => [Family], { name: 'family' })
  findAll() {
    return this.familyService.findAll();
  }

  @Query(() => Family, { name: 'family' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.familyService.findOne(id);
  }

  @Mutation(() => Family)
  updateFamily(
    @Args('updateFamilyInput') updateFamilyInput: UpdateFamilyInput,
  ) {
    return this.familyService.update(updateFamilyInput.id, updateFamilyInput);
  }

  @Mutation(() => Family)
  removeFamily(@Args('id', { type: () => Int }) id: number) {
    return this.familyService.remove(id);
  }
}
