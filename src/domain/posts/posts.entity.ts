import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DefaultEntity } from '../../common/entity/default.entity';
import { IsString } from 'class-validator';

export class Photo {
  @IsString()
  fileName: string;
  @IsString()
  url: string;
}

export class Video {
  @IsString()
  fileName: string;
  @IsString()
  url: string;
}

@Entity()
export class Post extends DefaultEntity {
  constructor(partial: Partial<Post>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'jsonb', nullable: true })
  photos: Photo[];

  @Column({ type: 'jsonb', nullable: true })
  videos: Video[];

  @Column({ default: 0 })
  viewCount: number;
}
