import { Images } from 'src/entities/images.entity';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UpdateImageDto } from './dto/update-image.dto';

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

  async updateImage(image: Images, updateImageDto: UpdateImageDto): Promise<Images> {
    const { hits, uri } = updateImageDto;

    if (hits) {
      image.hits = hits;
    }
    if (uri) {
      image.uri = uri;
    }

    try {
      await image.save();
    } catch (e) {
      console.log(e.code);
      throw new InternalServerErrorException();
    }

    return image;
  }
}
