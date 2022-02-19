import { Photo, Post, Video } from './posts.entity';
import { CreatePostsRequestDto } from '@/src/interfaces/posts/dto/posts.dto';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PostsCommand {
  export class CreatePostCommand {
    title: string;
    content: string;
    photos: Photo[];
    videos: Video[];

    constructor({ title, content, photos, videos }: CreatePostsRequestDto) {
      this.title = title;
      this.content = content;
      this.photos = photos;
      this.videos = videos;
    }

    toEntity() {
      return new Post(this);
    }
  }

  export class UpdatePostCommand {
    title: string;
    content: string;
    photos: Photo[];
    videos: Video[];

    constructor({ title, content, photos, videos }: CreatePostsRequestDto) {
      this.title = title;
      this.content = content;
      this.photos = photos;
      this.videos = videos;
    }

    toEntity() {
      return new Post(this);
    }
  }
}
