import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class FilePipe implements PipeTransform {
  transform(value: any) {
    console.log('value', value);
    if (value.size >> 19 > 1) {
      throw new Error('文件大小超出了１M');
    }
    return value;
  }
}
