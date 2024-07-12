import { HttpException, HttpStatus, PipeTransform } from '@nestjs/common';

export class IdPipe implements PipeTransform {
  transform(value: string, metadata: any) {
    console.log('metadata', metadata);
    if (!value || value === '000') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'id错误',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
