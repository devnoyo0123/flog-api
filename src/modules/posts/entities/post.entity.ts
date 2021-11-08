import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Family } from '../../families/entities/families.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Person } from '../../person/entities/person.entity';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'text', nullable: true })
  @Field(() => String)
  title: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String)
  content: string;

  @Column({ type: 'jsonb' })
  @Field(() => [String])
  photoUrls: string[];

  @Column({ type: 'jsonb' })
  @Field(() => [String])
  videoUrls: string[];

  @Column()
  @Field(() => String)
  viewCount: number;

  @ManyToOne(() => Person, (person) => person.posts)
  @Field(() => Person)
  person: Person;

  @ManyToOne(() => Family, (family) => family.posts)
  @Field(() => Family)
  family: Family;

  @OneToMany(() => Comment, (comment) => comment.post)
  @Field(() => [Comment])
  comments: Comment[];
}
