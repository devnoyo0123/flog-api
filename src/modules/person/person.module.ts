import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonResolver } from './person.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonRepository } from './person.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PersonRepository])],
  providers: [PersonResolver, PersonService],
})
export class PersonModule {}
