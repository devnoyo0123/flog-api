import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostsRequestDto, FindPostsRequestDto } from './dto/posts.dto';
import { PostsService } from '../../domain/posts/posts.service';
import { PostsCommand } from '../../domain/posts/posts.command';
import { PostsInfo } from '../../domain/posts/posts.info';
import { PostsCriteria } from '../../domain/posts/posts.criteria';

@Controller('posts')
export class PostsController {
  constructor(@Inject('PostsService') private postsService: PostsService) {}

  @Post()
  async createPost(@Body() dto: CreatePostsRequestDto) {
    const command = new PostsCommand.CreatePostCommand(dto);
    const createdPostId = await this.postsService.create(command);
    return PostsInfo.toCreatePostResponseDto(createdPostId);
  }

  @Put(':id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreatePostsRequestDto,
  ) {
    const command = new PostsCommand.UpdatePostCommand(dto);
    const updatedPostId = await this.postsService.update(id, command);
    return PostsInfo.toUpdatePostResponseDto(updatedPostId);
  }

  @Get()
  async findPosts(@Body() dto: FindPostsRequestDto) {
    const criteria = new PostsCriteria(dto);
    const [postInfos, totalCount] = await this.postsService.find(criteria);
    return PostsInfo.toReponseDtos(postInfos, dto.page, dto.size, totalCount);
  }

  @Get(':id')
  async findPostById(@Param('id', ParseIntPipe) id: number) {
    const postInfo: PostsInfo = await this.postsService.findById(id);
    return postInfo.toResponseDto();
  }

  @Delete(':id')
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    const deletePostId = await this.postsService.delete(id);
    return PostsInfo.toDeletePostResponseDto(deletePostId);
  }
}
