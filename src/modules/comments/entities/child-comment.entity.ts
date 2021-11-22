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

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Comment, (comment) => comment.childComments)
  @Field(() => Comment)
  parentComment: Comment;
}
