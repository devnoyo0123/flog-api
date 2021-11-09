import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsRepository } from './posts.repository';
import { FamiliesRepository } from '../families/families.repository';
import { PersonRepository } from '../person/person.repository';
import { CommentsRepository } from '../comments/comments.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostsRepository,
      FamiliesRepository,
      PersonRepository,
      CommentsRepository,
    ]),
  ],
  providers: [PostsResolver, PostsService],
})
export class PostsModule {}
