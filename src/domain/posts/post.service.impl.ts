import { PostsService } from './posts.service';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PostsCommand } from './posts.command';
import { PostsStore } from './posts.store';
import { getManager } from 'typeorm';
import { PostsReader } from './posts.reader';
import { PostsCriteria } from './posts.criteria';
import { PostsInfo } from './posts.info';

@Injectable()
export class PostServiceImpl implements PostsService {
  constructor(
    @Inject('PostsStore') private postsStore: PostsStore,
    @Inject('PostsReader') private postsReader: PostsReader,
  ) {}

  create(command: PostsCommand.CreatePostCommand) {
    return getManager().transaction(async (entityManager) => {
      const { id } = await this.postsStore.create(
        entityManager,
        command.toEntity(),
      );
      return id;
    });
  }

  delete(id: number) {
    return getManager().transaction((entityManager) => {
      return this.postsStore.delete(entityManager, id);
    });
  }

  async findById(id: number) {
    const post = await this.postsReader.findById(id);

    if (post === undefined) {
      throw new HttpException(
        '존재하지 않는 post입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    return new PostsInfo(post);
  }

  async find(criteria: PostsCriteria) {
    const [posts, count] = await this.postsReader.find(criteria);
    return [PostsInfo.toInfos(posts), count];
  }

  update(id: number, command: PostsCommand.UpdatePostCommand) {
    return getManager().transaction((entityManager) => {
      return this.postsStore.update(entityManager, id, command.toEntity());
    });
  }
}
