import { Column } from 'typeorm';

export abstract class DefaultEntity {
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @Column({ type: 'timestamptz', nullable: true })
  deletedAt: Date;
}
