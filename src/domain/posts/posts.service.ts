import { PostsCommand } from './posts.command';
import { PostsCriteria } from './posts.criteria';

export interface PostsService {
  create(command: PostsCommand.CreatePostCommand);
  findById(id: number);
  find(criteria: PostsCriteria);
  update(id: number, command: PostsCommand.UpdatePostCommand);
  delete(id: number);
}
