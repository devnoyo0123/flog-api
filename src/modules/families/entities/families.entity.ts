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

  @Column({ type: 'jsonb', nullable: true })
  @Field(() => [String])
  profileImageUrl: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  deletedAt: Date;

  @OneToMany(() => FamilyToPerson, (familyToPerson) => familyToPerson.person)
  @Field(() => [Person])
  Persons: Person[];

  @OneToMany(() => Post, (post) => post.family)
  @Field(() => [Post])
  posts: Post[];
}
