import { CLOUDINARY } from './constants';
// Require the Cloudinary library
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary').v2;
export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): void => {
    return cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};
