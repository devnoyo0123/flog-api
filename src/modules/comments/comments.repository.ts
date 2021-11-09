import { Comment } from './entities/comment.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../posts/entities/post.entity';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
  async findByPost(post: Post) {
    return await this.find({
      relations: ['post'],
      where: {
        post,
      },
    });
  }
}
