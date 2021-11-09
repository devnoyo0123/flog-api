import { Family } from './entities/families.entity';
import { EntityRepository, Repository } from 'typeorm';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';

@EntityRepository(Family)
export class FamiliesRepository extends Repository<Family> {
  private logger: Logger = new Logger(this.constructor.name);

  async findById(id: number): Promise<Family> {
    const foundFamily = await this.findOne(id);
    if (foundFamily === undefined) {
      throw new HttpException(
        `id: ${id}인 가족이 존재하지 않습니다.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return foundFamily;
  }
}
