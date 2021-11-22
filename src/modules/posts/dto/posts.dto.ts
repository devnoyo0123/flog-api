import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => [String])
  photoUrls: string[];

  @Field(() => [String])
  videoUrls: string[];

  @Field(() => Int)
  viewCount: number;

  @Field(() => Int)
  personId: number;

  @Field(() => Int)
  familyId: number;
}

@InputType()
export class UpdatePostInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => [String])
  photoUrls: string[];

  @Field(() => [String])
  videoUrls: string[];

  @Field(() => Int)
  viewCount: number;

  @Field(() => Int)
  personId: number;

  @Field(() => Int)
  familyId: number;
}
