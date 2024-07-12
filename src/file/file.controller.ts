import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
// import { CreateFileDto } from './dto/create-file.dto';
// import { UpdateFileDto } from './dto/update-file.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { FilePipe } from '../pipe';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: './upload' }))
  uploadSingle(
    @UploadedFile(
      FilePipe,
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log('file', file);
    return file;
  }

  @Post('multiUpload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadBatch(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log('files', files);
  }

  @Post('multiUploadWithName')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  uploadWithName(
    @UploadedFiles()
    files: {
      avater: Express.Multer.File;
      background: Express.Multer.File;
    },
  ) {
    console.log('files', files);
  }
}
