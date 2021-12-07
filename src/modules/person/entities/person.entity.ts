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
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column({ nullable: true })
  @Field()
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  @Field(() => [String])
  profileImageUrl: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Post, (post) => post.person)
  @Field(() => [Post])
  posts: Post[];

  @OneToMany(() => FamilyToPerson, (familyToPerson) => familyToPerson.family)
  @Field(() => [Family])
  families: Family[];
}
