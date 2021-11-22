import { Post } from './entities/post.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Family } from '../families/entities/families.entity';
import { Person } from '../person/entities/person.entity';
import { Comment } from '../comments/entities/comment.entity';
import { CreatePostInput, UpdatePostInput } from './dto/posts.dto';

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

  async updateOne(dto: UpdatePostInput, family: Family, person: Person) {
    const updatePost = Object.assign(
      { ...dto },
      {
        family,
        person,
      },
      {
        updatedAt: new Date(),
      },
    );
    const updatedPost = await this.save(updatePost);
    this.logger.debug(`포스트 수정 결과 : ${JSON.stringify(updatedPost)}`);
    return updatedPost;
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

  async deleteOne(post: Post) {
    const deletePost = Object.assign(
      {
        ...post,
      },
      {
        deleteAt: new Date(),
      },
    );
    const deletedPost = await this.save(deletePost);
    this.logger.debug(`포스트 삭제 결과 : ${JSON.stringify(deletedPost)}`);
    return deletedPost;
  }
}
