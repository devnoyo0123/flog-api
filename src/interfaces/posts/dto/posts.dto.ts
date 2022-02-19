import { IsArray, IsJSON, IsNotEmpty, ValidateNested } from 'class-validator';
import { Photo, Video } from '@/src/domain/posts/posts.entity';
import { PostsInfo } from '@/src/domain/posts/posts.info';
import { Paging } from '@/src/common/dto/paging';
import { Type } from 'class-transformer';

export class CreatePostsRequestDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Photo)
  photos: Photo[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Photo)
  videos: Video[];
}

export class CreatePostsResponseDto {
  constructor(id: number) {
    this.id = id;
  }

  id: number;
}

export class DeletePostsRequestDto {
  @IsNotEmpty()
  id: number;
}

export class DeletePostsResponseDto {
  constructor(id: number) {
    this.id = id;
  }

  id: number;
}

export class UpdatePostsRequestDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsJSON()
  photoUrls: Photo[];

  @IsJSON()
  videoUrls: Photo[];
}

export class UpdatePostsResponseDto {
  id: number;
  constructor(updatedPostId: number) {
    this.id = updatedPostId;
  }
}

export class PostResponseDto {
  id: number;
  title: string;
  content: string;
  photos: Photo[];
  videos: Video[];

  constructor({ id, title, content, photos, videos }: PostsInfo) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.photos = photos;
    this.videos = videos;
  }
}

export class FindPostsRequestDto extends Paging {}
