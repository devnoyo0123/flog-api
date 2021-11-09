import { Family } from './entities/families.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

@EntityRepository(Family)
export class FamiliesRepository extends Repository<Family> {
  private logger: Logger = new Logger(this.constructor.name);

  async findById(id: number): Promise<Family> {
    return await this.findOne(id);
  }
}
