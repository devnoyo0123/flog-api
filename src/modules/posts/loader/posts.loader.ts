import * as DataLoader from 'dataloader';
import { Comment } from '../../comments/entities/comment.entity';
import { PostsService } from '../posts.service';

export function createLoader(postsService: PostsService) {
  return new DataLoader<number, Comment[]>(
    (postIds: readonly number[]) => postsService.batchComments(postIds),
    {
      cache: false,
    },
  );
}
