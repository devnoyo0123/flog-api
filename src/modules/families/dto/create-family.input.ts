import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFamilyInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
