export abstract class UploadServiceRepository {
  abstract uploadImage(files: Express.Multer.File[]): Promise<string[]>;
}
