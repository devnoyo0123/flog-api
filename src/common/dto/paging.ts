import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export abstract class Paging {
  /**
   * page 수
   */
  @Transform((transform) => {
    return parseInt(transform.value);
  })
  @IsNumber()
  page = 1;

  /**
   * 한 page 의 총 row 수
   */
  @Transform((transform) => {
    return parseInt(transform.value);
  })
  @IsNumber()
  size = 10;
}
