import { PostsCriteria } from './posts.criteria';

export interface PostsReader {
  findById(id: number);
  find(criteria: PostsCriteria);
}
