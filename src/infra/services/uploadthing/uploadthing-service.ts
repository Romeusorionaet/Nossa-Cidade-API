import { UploadServiceRepository } from 'src/domain/our-city/application/repositories/services/upload/upload-service.repository';
import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { EnvService } from 'src/infra/env/env.service';
import { UTApi } from 'uploadthing/server';

@Injectable()
export class UploadThingService implements UploadServiceRepository {
  private utApi: UTApi;

  constructor(private readonly envService: EnvService) {
    this.utApi = new UTApi({
      token: this.envService.get('UPLOADTHING_TOKEN'),
    });
  }
  async uploadImage(files: Express.Multer.File[]): Promise<string[]> {
    try {
      const filesArray = Array.isArray(files) ? files : [files];

      const blobs = filesArray.map((file) => {
        const blob = new Blob([file.buffer], { type: file.mimetype });

        const convertedFile = Object.assign(blob, {
          name: file.originalname,
        });

        return this.utApi.uploadFiles([convertedFile]);
      });

      const uploadResponses = await Promise.all(blobs);

      const result = uploadResponses.map((response) => {
        const url = response[0].data.ufsUrl;
        return url.split('https://totpi0dl7f.ufs.sh/f/')[1];
      });

      return result;
    } catch (error) {
      console.error('Erro inesperado no serviço de upload:', error);
      throw new InternalServerErrorException('Erro interno ao enviar imagem.');
    }
  }
}
