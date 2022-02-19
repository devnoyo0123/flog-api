import { FindPostsRequestDto } from '../../interfaces/posts/dto/posts.dto';

export class PostsCriteria {
  page: number;
  size: number;
  take: number;
  skip: number;
  constructor({ page, size }: FindPostsRequestDto) {
    this.page = page;
    this.size = size;
    this.take = size;
    this.skip = (page - 1) * size;
  }
}
