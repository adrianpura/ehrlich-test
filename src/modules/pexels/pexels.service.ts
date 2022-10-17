import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class PexelsService {
  constructor(private readonly httpService: HttpService) {}

  get(per_page: number) {
    try {
      const options = {
        headers: {
          Authorization: process.env.PEXEL_API_KEY,
        },
      };

      const page = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
      const url = `https://api.pexels.com/v1/curated?page=${page}&per_page=${per_page}`;

      return (
        this.httpService
          .get(url, options)
          //   .pipe(map((response) => response.data));
          .pipe(
            catchError((e) => {
              throw new NotFoundException(e.response.data, e.response.status);
            }),
            map((response) => {
              return response.data;
            }),
          )
      );
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
