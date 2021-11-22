import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreatePostInput, UpdatePostInput } from './dto/posts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsRepository } from './posts.repository';
import { FamiliesRepository } from '../families/families.repository';
import { PersonRepository } from '../person/person.repository';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,
    @InjectRepository(FamiliesRepository)
    private familiesRepository: FamiliesRepository,
    @InjectRepository(PersonRepository)
    private personRepository: PersonRepository,
  ) {}

  async create(createPostInput: CreatePostInput) {
    this.logger.debug(`
    create(dto: ${JSON.stringify(createPostInput)}`);
    const familyId = createPostInput.familyId;
    const family = await this.familiesRepository.findById(familyId);
    if (family === undefined) {
      throw new HttpException(
        `id: ${familyId}인 가족이 존재하지 않습니다.`,
        HttpStatus.NOT_FOUND,
      );
    }
    const personId = createPostInput.personId;
    const person = await this.personRepository.findById(personId);
    if (person === undefined) {
      throw new HttpException(
        `id: ${personId}인 가족이 존재하지 않습니다.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.postsRepository.createOne(createPostInput, family, person);
  }

  async findAll() {
    return await this.postsRepository.findAll();
  }

  async findOne(id: number) {
    const foundPost = await this.postsRepository.findById(id);
    if (foundPost === undefined) {
      return null;
    }
    return foundPost;
  }

  async update(id: number, updatePostInput: UpdatePostInput) {
    this.logger.debug(`
    update(dto: ${JSON.stringify(updatePostInput)}`);
    const familyId = updatePostInput.familyId;

    const family = await this.familiesRepository.findById(familyId);
    if (family === undefined) {
      throw new HttpException(
        `id: ${familyId}인 가족이 존재하지 않습니다.`,
        HttpStatus.NOT_FOUND,
      );
    }
    const personId = updatePostInput.personId;
    const person = await this.personRepository.findById(personId);
    if (person === undefined) {
      throw new HttpException(
        `id: ${personId}인 가족이 존재하지 않습니다.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.postsRepository.updateOne(updatePostInput, family, person);
  }

  async remove(id: number) {
    const post: Post = await this.postsRepository.findById(id);
    return this.postsRepository.deleteOne(post);
  }

  async batchComments(postIds: readonly number[]) {
    return this.postsRepository.batchComments(postIds);
  }
}
