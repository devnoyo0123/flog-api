import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePersonInput {
  @Field(() => String, { description: '이름' })
  name: string;

  @Field(() => String, { description: '이메일' })
  email: string;

  @Field(() => String, { description: '패스워드' })
  password: string;

  @Field(() => String, { nullable: true, description: '한줄소개' })
  description?: string;
}
