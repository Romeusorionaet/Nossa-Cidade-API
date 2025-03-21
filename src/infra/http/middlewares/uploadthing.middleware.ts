import { Injectable, NestMiddleware } from '@nestjs/common';
import { uploadRouter } from '../config/uploadhting.config';
import { Request, Response } from 'express';
import { createRouteHandler } from 'uploadthing/server';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'node:stream';

@Injectable()
export class UploadThingMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  async use(req: Request, res: Response) {
    const routeHandler = createRouteHandler({
      router: uploadRouter,
      config: {
        token: this.configService.get('UPLOADTHING_TOKEN'),
      },
    });

    const fetchRequest = new Request(`http://${req.headers.host}${req.url}`, {
      method: req.method,
      headers: new Headers(req.headers as any),
      body: req.readable ? Readable.toWeb(req) : undefined,
    });

    const fetchResponse = await routeHandler({ request: fetchRequest });

    res.status(fetchResponse.status);
    fetchResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    res.send(await fetchResponse.text());
  }
}
