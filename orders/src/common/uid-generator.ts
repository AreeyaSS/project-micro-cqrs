import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

@Injectable()
export class UidGenerator {
  generate(): string {
    return nanoid();
  }
}
