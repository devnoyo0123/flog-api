import { EntityRepository, Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {
  private logger: Logger = new Logger(this.constructor.name);

  async findById(id: number): Promise<Person> {
    const foundPerson = this.findOne(id);
    if (foundPerson === undefined) {
      throw new HttpException(
        `id: ${id}인 가족이 존재하지 않습니다.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return foundPerson;
  }
}
