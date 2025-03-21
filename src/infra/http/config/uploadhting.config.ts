import { createUploadthing, type FileRouter } from 'uploadthing/express';

const f = createUploadthing();

export const uploadRouter = {
  NC_BP: f({
    image: {
      maxFileSize: '512KB',
      maxFileCount: 2,
    },
  }).onUploadComplete((data) => {
    console.log('Upload finalizado:', data);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
