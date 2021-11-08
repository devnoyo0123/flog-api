import { Injectable, Logger } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,
  ) {}

  create(createPostInput: CreatePostInput) {
    this.logger.debug(`
    create(dto: ${JSON.stringify(createPostInput)}`);
    return this.postsRepository.createOne(createPostInput);
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
