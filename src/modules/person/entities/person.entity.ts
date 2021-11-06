import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Family } from '../../families/entities/families.entity';
import { FamilyToPerson } from '../../family-to-person/entities/family-to-person.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity()
@ObjectType()
export class Person {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'id' })
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  profileImageUrl: string;

  @OneToMany(() => Post, (post) => post.person)
  @Field(() => [Post])
  posts: Post[];

  @OneToMany(() => FamilyToPerson, (familyToPerson) => familyToPerson.family)
  @Field(() => [Family])
  families: Family[];
}
