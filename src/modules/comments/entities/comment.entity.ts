import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/modules/posts/entities/post.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  /**
   * 상위코드 다대다 셀프 조인
   * https://github.com/typeorm/typeorm/blob/master/docs/relations-faq.md
   */
  @OneToMany(() => Comment, (comment) => comment.parentComment)
  @Field(() => [Comment])
  detailComments: Comment[];

  @ManyToOne(() => Comment, (comment) => comment.detailComments)
  @JoinColumn([{ name: 'parent_id', referencedColumnName: 'id' }])
  @Field(() => Comment)
  parentComment: Comment;
}
