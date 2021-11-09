import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsRepository } from './comments.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsRepository])],
  providers: [CommentsResolver, CommentsService],
})
export class CommentsModule {}
