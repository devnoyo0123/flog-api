import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput, UpdatePostInput } from './dto/posts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsRepository } from '../comments/comments.repository';
import { Comment } from '../comments/entities/comment.entity';
import * as DataLoader from 'dataloader';
import { createLoader } from './loader/posts.loader';

@Resolver(() => Post)
export class PostsResolver {
  postsLoader: DataLoader<number, Comment[]>;
  constructor(
    private readonly postsService: PostsService,
    @InjectRepository(CommentsRepository)
    private commentsRepository: CommentsRepository,
  ) {
    this.postsLoader = createLoader(postsService);
  }

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findPost(@Args('postId', { type: () => Int }) id: number) {
    return this.postsService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postsService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.remove(id);
  }

  @ResolveField()
  comments(@Parent() post: Post): Promise<Comment[]> {
    return this.postsLoader.load(post.id);
  }
}
