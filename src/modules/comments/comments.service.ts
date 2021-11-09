import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsRepository)
    private commentsRepository: CommentsRepository,
  ) {}

  create(createCommentInput: CreateCommentInput) {
    return 'This action adds a new comment';
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentInput: UpdateCommentInput) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }

  async findAllByPostId(id: number) {
    return this.commentsRepository.findOne(id);
  }
}
