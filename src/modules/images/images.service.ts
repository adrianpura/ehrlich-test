import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
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
import { UpdateImageDto } from './dto/update-image.dto';
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

    return returnObj;
  }

  async saveImage(uploadImageDto: UploadImageDto): Promise<any> {
    const { hits, uri, owner } = uploadImageDto;
    const data = await this.imagesRepository.saveImage(hits, uri);
    return data;
  }

  async findByID(id: number): Promise<any> {
    const result = await this.imagesRepository.findOne(id);

    if (!result) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    return result;
  }

  async updateImage(updateImageDto: UpdateImageDto, id: number): Promise<any> {
    const { hits, uri } = updateImageDto;
    const image = await this.imagesRepository.findOne(id);

    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    const data = await this.imagesRepository.updateImage(image, updateImageDto);

    return {
      statusCode: 200,
      message: 'image updated',
      data: data,
    };
  }

  async deleteImage(id: number): Promise<any> {
    const result = await this.imagesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    return {
      statusCode: 200,
      message: 'Image deleted',
      data: [],
    };
  }
}
