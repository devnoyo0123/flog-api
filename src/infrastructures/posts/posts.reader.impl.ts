import { PostsReader } from '../../domain/posts/posts.reader';
import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { Post } from '../../domain/posts/posts.entity';
import { PostsCriteria } from '../../domain/posts/posts.criteria';

@Injectable()
export class PostsReaderImpl implements PostsReader {
  find({ take, skip }: PostsCriteria) {
    return getManager()
      .getRepository(Post)
      .createQueryBuilder('post')
      .select(['post'])
      .where('post.deletedAt IS NULL')
      .take(take)
      .skip(skip)
      .getManyAndCount();
  }

  findById(id: number) {
    return getManager()
      .getRepository(Post)
      .createQueryBuilder('post')
      .select(['post'])
      .where('post.deletedAt IS NULL')
      .andWhere('post.id = :id', { id })
      .getOne();
  }
}
