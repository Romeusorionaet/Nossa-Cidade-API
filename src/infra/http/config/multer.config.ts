import { BadRequestException } from '@nestjs/common';

export const multerConfig = {
  limits: { fileSize: 500 * 1024 }, // 500KB
  fileFilter: (_, file, callback) => {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return callback(
        new BadRequestException(
          'Apenas arquivos PNG, JPG e JPEG são permitidos',
        ),
        false,
      );
    }

    callback(null, true);
  },
};
