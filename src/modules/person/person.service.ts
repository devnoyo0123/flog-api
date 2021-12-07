import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';
import { PersonRepository } from './person.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from '../../common/crypto/crypto.service';

@Injectable()
export class PersonService {
  constructor(
    private cryptoService: CryptoService,
    @InjectRepository(PersonRepository)
    private personRepository: PersonRepository,
  ) {}

  async create(createPersonInput: CreatePersonInput) {
    // 아이디 중복 확인
    const foundPerson = await this.findPersonByEmail(createPersonInput.email);

    if (foundPerson) {
      throw new HttpException(
        '중복된 email이 있습니다.',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const hashedPassword = await this.cryptoService.generateHash(
      createPersonInput.password,
    );
    return await this.personRepository.createOne(
      Object.assign({ ...createPersonInput, password: hashedPassword }),
    );
  }

  findAll() {
    return `This action returns all person`;
  }

  async findOne(id: number) {
    return await this.personRepository.findById(id);
  }

  update(id: number, updatePersonInput: UpdatePersonInput) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }

  private async findPersonByEmail(email: string) {
    return await this.personRepository.findByEmail(email);
  }
}
