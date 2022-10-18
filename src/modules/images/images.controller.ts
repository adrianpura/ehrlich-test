import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
  UseGuards,
  Request,
  ValidationPipe,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { UploadImageDto } from './dto/upload-image.dto';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetImagesFilterDto } from './dto/get-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiBearerAuth()
  @ApiBody({ type: UploadImageDto })
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadFile(@Body() uploadImageDto: UploadImageDto, @Request() req) {
    return this.imagesService.saveImage(uploadImageDto);
    // return this.imagesService.uploadImageToCloudinary(uploadImageDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiBody({ type: GetImagesFilterDto, required: false })
  @UseGuards(JwtAuthGuard)
  findImages(@Query(ValidationPipe) filterDto: GetImagesFilterDto, @Query('limit') limit = 5) {
    limit = limit > 10 ? 10 : limit;
    return this.imagesService.findImages(limit);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findImagesById(@Param('id', ParseIntPipe) id: number) {
    return this.imagesService.findByID(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updateImage(@Body() updateImageDto: UpdateImageDto, @Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.imagesService.updateImage(updateImageDto, id);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.imagesService.deleteImage(id);
  }
}
