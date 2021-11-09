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
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsRepository } from '../comments/comments.repository';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    @InjectRepository(CommentsRepository)
    private commentsRepository: CommentsRepository,
  ) {}

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
  async comments(@Parent() post: Post) {
    return await this.commentsRepository.findByPost(post);
  }
}
