import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PexelsModule } from '../pexels/pexels.module';
import { ImagesRepository } from './images.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ImagesRepository]), CloudinaryModule, PexelsModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
