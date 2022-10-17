import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto, UploadImageDto } from './dto/upload-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetImagesFilterDto } from './dto/get-image.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Images } from 'src/entities/images.entity';
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadFile(@Body() uploadImageDto: UploadImageDto, @Request() req) {
    console.log('req: ', req.user);
    return this.imagesService.uploadImageToCloudinary(uploadImageDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findImages(@Query(ValidationPipe) filterDto: GetImagesFilterDto, @Query('limit') limit = 5) {
    limit = limit > 10 ? 10 : limit;
    return this.imagesService.findImages(limit);
  }
}
