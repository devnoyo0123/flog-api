import { EntityRepository, IsNull, Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { Logger } from '@nestjs/common';
import { CreatePersonInput } from './dto/create-person.input';

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {
  private logger: Logger = new Logger(this.constructor.name);

  async findById(id: number): Promise<Person> {
    return this.findOne({
      where: {
        id,
        deletedAt: IsNull(),
      },
    });
  }

  async findByEmail(email: string): Promise<Person> {
    return this.findOne({
      where: {
        email,
        deletedAt: IsNull(),
      },
    });
  }

  async createOne(dto: CreatePersonInput): Promise<CreatePersonInput & Person> {
    const result = await this.save(dto);
    this.logger.debug(`사용자 생성 결과: ${JSON.stringify(result)}`);
    return result;
  }
}
