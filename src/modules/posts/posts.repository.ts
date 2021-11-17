import { Post } from './entities/post.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { Logger } from '@nestjs/common';
import { Family } from '../families/entities/families.entity';
import { Person } from '../person/entities/person.entity';
import { Comment } from '../comments/entities/comment.entity';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  private logger: Logger = new Logger(this.constructor.name);

  async createOne(
    dto: CreatePostInput,
    family: Family,
    person: Person,
  ): Promise<Post> {
    const createPost = Object.assign(
      { ...dto },
      {
        family,
        person,
      },
    );
    const savedPost = await this.save(createPost);
    this.logger.debug(`포스트 생성 결과 : ${JSON.stringify(savedPost)}`);
    return savedPost;
  }

  findById(id: number): Promise<Post> {
    return this.findOne(id);
  }

  async batchComments(postIds: readonly number[]): Promise<Comment[][]> {
    const posts = await this.createQueryBuilder('post')
      .leftJoinAndSelect('post.comments', 'comments')
      .where(`post.id IN (:...postIds)`, { postIds })
      .getMany();

    const postMap: { [key: string]: Comment[] } = {};
    posts.forEach((post: Post) => (postMap[post.id] = post.comments));
    return postIds.map((id) => postMap[id]);
  }

  async findAll(): Promise<Post[]> {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.person', 'person')
      .leftJoinAndSelect('post.family', 'family')
      .leftJoinAndSelect('post.comments', 'comments')
      .getMany();
  }
}
