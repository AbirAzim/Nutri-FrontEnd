import S3_CONFIG from '../../configs/s3';
import axios from 'axios';

const imageUploadS3 = (files: any[]) => {
  let images: string[] = [];

  return new Promise(async (res, rej) => {
    try {
      for (let i = 0; files?.length > i; i++) {
        const file = files[i];
        const fileName = file.name;
        let extension = fileName.split('.').pop();

        const { Key, uploadURL } = await (
          await axios.get(`${S3_CONFIG.objectURL}?fileType=${extension}`)
        ).data;
        await fetch(uploadURL, {
          method: 'PUT',
          body: file,
        });
        const objectUrl = `${S3_CONFIG.baseURL}/${Key}`;
        images?.push(objectUrl);
      }
      res(images);
    } catch (error) {
      rej(error);
      console.log(error.message);
    }
  });
};

export default imageUploadS3;
