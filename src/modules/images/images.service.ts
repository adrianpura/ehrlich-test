import { Injectable, BadRequestException } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateImageDto, UploadImageDto } from './dto/upload-image.dto';

@Injectable()
export class ImagesService {
  constructor(private cloudinary: CloudinaryService) {}

  async uploadImageToCloudinary(uploadImageDto: UploadImageDto) {
    const { uri, owner } = uploadImageDto;
    return await this.cloudinary.uploadImage(uri).catch((e) => {
      throw new BadRequestException('Invalid file type.');
    });
  }
}
