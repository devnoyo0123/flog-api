import { Post } from './entities/post.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { Logger } from '@nestjs/common';
import { Family } from '../families/entities/families.entity';
import { Person } from '../person/entities/person.entity';

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

  findById(id: number) {
    return this.findOne(id);
  }

  async findAll() {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.person', 'person')
      .leftJoinAndSelect('post.family', 'family')
      .leftJoinAndSelect('post.comments', 'comments')
      .getMany();
  }
}
