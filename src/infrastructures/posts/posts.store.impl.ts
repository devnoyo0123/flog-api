import { PostsStore } from '../../domain/posts/posts.store';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Post } from '../../domain/posts/posts.entity';

@Injectable()
export class PostsStoreImpl implements PostsStore {
  create(entityManger: EntityManager, entity: Post): Promise<Post> {
    return entityManger.save(entity);
  }

  async delete(entityManager: EntityManager, id: number) {
    const post = await entityManager.findOne(Post, { where: { id } });
    if (post === undefined) {
      throw new HttpException(
        `존재하지 않은 Post입니다. `,
        HttpStatus.NOT_FOUND,
      );
    }
    const now = new Date();
    const deletePost = Object.assign(post, { deletedAt: now });
    await entityManager.save(deletePost);
    return id;
  }

  async update(entityManager: EntityManager, id: number, entity: Post) {
    const post = await entityManager.findOne(Post, { where: { id } });
    if (post === undefined) {
      throw new HttpException(
        `존재하지 않은 Post입니다. `,
        HttpStatus.NOT_FOUND,
      );
    }
    const now = new Date();
    const updatePost = Object.assign(post, { ...entity }, { updatedAt: now });
    await entityManager.save(updatePost);
    return id;
  }
}
