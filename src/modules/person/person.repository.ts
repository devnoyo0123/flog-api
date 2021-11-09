import { EntityRepository, Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { Logger } from '@nestjs/common';

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {
  private logger: Logger = new Logger(this.constructor.name);

  async findById(id: number): Promise<Person> {
    return this.findOne(id);
  }
}
