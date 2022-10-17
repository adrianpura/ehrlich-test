import { Injectable, BadRequestException } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { GetImagesFilterDto } from './dto/get-image.dto';
import { CreateImageDto, UploadImageDto } from './dto/upload-image.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Images } from 'src/entities/images.entity';
import { PexelsService } from '../pexels/pexels.service';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs/internal/Observable';
import { SaveImagesDto } from './dto/save-image.dto';
import { ImagesRepository } from './images.repository';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImagesRepository) private imagesRepository: ImagesRepository,
    private cloudinary: CloudinaryService,
    private readonly pexelsService: PexelsService,
  ) {}

  async uploadImageToCloudinary(uploadImageDto: UploadImageDto) {
    const { uri, owner } = uploadImageDto;
    return await this.cloudinary.uploadImage(uri).catch((e) => {
      throw new BadRequestException('Invalid file type.');
    });
  }

  async findImages(limit: number): Promise<any> {
    const images = await this.pexelsService.get(limit).toPromise();
    const returnObj = {
      limit: limit,
      data: [],
    };
    // console.log('returnObj: ', returnObj);

    for (const photo of images.photos) {
      // console.log('photo: ', photo.src.medium);

      //  save image to db
      const image = await this.imagesRepository.saveImage(1, photo.src.medium);

      // upload to cloundinary
      this.cloudinary.uploadImage(photo.src.medium).catch((e) => {
        console.log('error', e);
        throw new BadRequestException('Invalid file type.');
      });

      const obj = {
        id: image.id,
        hits: image.hits,
        uri: image.uri,
      };
      returnObj.data.push(obj);
    }

    images.photos.forEach((element) => {
      // console.log('element.url', element.src.medium);
      // console.log('typeof element.url', typeof element.url);
      //save image to db
      // const image = this.saveImage(1, element.url);
      // console.log('image: ', image);
      // upload to cloundinary
      // this.cloudinary.uploadImage(element.src.medium).catch((e) => {
      //   console.log('error', e);
      //   throw new BadRequestException('Invalid file type.');
      // });
    });

    return returnObj;
  }

  async saveImage(hits: number, uri: string): Promise<any> {
    const data = await this.imagesRepository.saveImage(hits, uri);
    return {
      statusCode: 201,
      message: 'image saved',
      data: data,
    };
  }
}
