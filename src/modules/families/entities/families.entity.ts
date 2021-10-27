import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { FamilyToPerson } from '../../family-to-person/entities/family-to-person.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity()
@ObjectType()
export class Family {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'id' })
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  profileImageUrl: string;

  @OneToMany(() => FamilyToPerson, (familyToPerson) => familyToPerson.person)
  @Field(() => [Person])
  Persons: Person[];

  @OneToMany(() => Post, (post) => post.family)
  @Field(() => [Post])
  posts: Post[];
}
