import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { resolve } from 'path';
@Injectable()
export class CloudinaryService {
  async uploadImage(uri: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      // const upload = v2.uploader.upload_stream((error, result) => {
      //   if (error) return reject(error);
      //   resolve(result);
      // });
      // toStream(file.buffer).pipe(upload);

      // const uniqueFilename = new Date().toISOString();
      // const upload = v2.uploader.upload(
      //   uri,
      //   { public_id: `nestjs/${uniqueFilename}`, tags: `nestjs` }, // directory and tags are optional
      //   function (err, image) {
      //     if (err) return reject(err);
      //     resolve(image);
      //   },
      // );
      const uniqueFilename = new Date().toISOString();
      const upload = v2.uploader
        .upload(uri, {
          public_id: `nestjs/${uniqueFilename}`,
          tags: 'nestjs',
          responsive_breakpoints: { create_derived: true, bytes_step: 20000, min_width: 200, max_width: 1000 },
        })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => reject(err));
    });
  }
}
