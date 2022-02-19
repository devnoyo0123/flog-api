import { Module } from '@nestjs/common';
import { PostsController } from '../interfaces/posts/posts.controller';
import { PostServiceImpl } from '../domain/posts/post.service.impl';
import { PostsStoreImpl } from '../infrastructures/posts/posts.store.impl';
import { PostsReaderImpl } from '../infrastructures/posts/posts.reader.impl';

export const PostsServiceProvider = {
  provide: 'PostsService',
  useClass: PostServiceImpl,
};

export const PostsStoreProvider = {
  provide: 'PostsStore',
  useClass: PostsStoreImpl,
};

export const PostsReaderProvider = {
  provide: 'PostsReader',
  useClass: PostsReaderImpl,
};

@Module({
  controllers: [PostsController],
  providers: [PostsServiceProvider, PostsStoreProvider, PostsReaderProvider],
})
export class PostsModule {}
