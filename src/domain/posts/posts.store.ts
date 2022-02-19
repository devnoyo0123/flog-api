import { EntityManager } from 'typeorm';
import { Post } from '@/src/domain/posts/posts.entity';

export interface PostsStore {
  create(entityManger: EntityManager, entity: Post): Promise<Post>;
  update(entityManager: EntityManager, id: number, entity: Post);
  delete(entityManager: EntityManager, id: number);
}
