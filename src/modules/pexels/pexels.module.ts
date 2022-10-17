import { Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';
import { PexelsService } from './pexels.service';
@Module({
  imports: [HttpModule],
  providers: [PexelsService],
  exports: [PexelsService],
})
export class PexelsModule {}
