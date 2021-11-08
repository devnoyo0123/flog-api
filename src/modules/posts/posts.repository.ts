import { Post } from './entities/post.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { Logger } from '@nestjs/common';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  private logger: Logger = new Logger(this.constructor.name);

  async createOne(dto: CreatePostInput): Promise<Post> {
    const savedPost = await this.save(dto);
    this.logger.debug(`포스트 생성 결과 : ${savedPost}`);
    return savedPost;
  }
}
