import { Photo, Post, Video } from './posts.entity';
import {
  DeletePostsResponseDto,
  CreatePostsResponseDto,
  UpdatePostsResponseDto,
} from '@/src/interfaces/posts/dto/posts.dto';

export class PostsInfo {
  id: number;
  title: string;
  content: string;
  photos: Photo[];
  videos: Video[];
  viewCount: number;

  constructor({
    id,
    title,
    content,
    photos,
    videos,
    viewCount,
  }: Partial<Post>) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.photos = photos;
    this.videos = videos;
    this.viewCount = viewCount;
  }

  toResponseDto() {
    return new PostsInfo(this);
  }

  static toInfos(posts: Post[]) {
    return posts.map((post) => new PostsInfo(post));
  }

  static toDeletePostResponseDto(deletedPostId: number) {
    return new DeletePostsResponseDto(deletedPostId);
  }

  static toCreatePostResponseDto(createdPostId: number) {
    return new CreatePostsResponseDto(createdPostId);
  }

  static toUpdatePostResponseDto(updatedPostId: number) {
    return new UpdatePostsResponseDto(updatedPostId);
  }

  static toReponseDtos(
    postInfos: PostsInfo[],
    page: number,
    size: number,
    totalCount: number,
  ) {
    return {
      posts: postInfos,
      page,
      size,
      totalCount,
    };
  }
}
