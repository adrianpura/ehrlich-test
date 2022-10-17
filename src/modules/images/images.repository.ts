import { Images } from 'src/entities/images.entity';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { SaveImagesDto } from './dto/save-image.dto';

@EntityRepository(Images)
export class ImagesRepository extends Repository<Images> {
  async saveImage(hits: number, uri: string): Promise<Images> {
    const image = new Images();
    image.hits = hits;
    image.uri = uri;

    try {
      await image.save();
    } catch (e) {
      if (e.code === '23505' || e.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('images already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return image;
  }
}
