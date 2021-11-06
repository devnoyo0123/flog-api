import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
@ObjectType()
export class ChildComment {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'id' })
  id: number;

  @Column()
  @Field()
  content: string;

  @ManyToOne(() => Comment, (comment) => comment.childComments)
  @Field(() => Comment)
  parentComment: Comment;
}
