import { Injectable } from '@nestjs/common';
import { CreateFamilyInput } from './dto/create-family.input';
import { UpdateFamilyInput } from './dto/update-family.input';

@Injectable()
export class FamiliesService {
  create(createFamilyInput: CreateFamilyInput) {
    return 'This action adds a new family';
  }

  findAll() {
    return `This action returns all family`;
  }

  findOne(id: number) {
    return `This action returns a #${id} family`;
  }

  update(id: number, updateFamilyInput: UpdateFamilyInput) {
    return `This action updates a #${id} family`;
  }

  remove(id: number) {
    return `This action removes a #${id} family`;
  }
}
