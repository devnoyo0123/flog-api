import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/modules/posts/entities/post.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChildComment } from './child-comment.entity';

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'id' })
  id: number;

  @Column()
  @Field()
  content: string;

  @ManyToOne(() => Post, (post) => post.comments)
  @Field(() => Post)
  post: Post;

  @OneToMany(() => ChildComment, (childComment) => childComment.parentComment)
  @Field(() => [ChildComment])
  childComments: ChildComment[];
}
