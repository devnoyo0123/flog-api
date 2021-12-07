import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  private readonly SALT_OF_ROUNDS = 10;

  async generateHash(plainText: string) {
    return await bcrypt.hash(plainText, this.SALT_OF_ROUNDS);
  }
}
