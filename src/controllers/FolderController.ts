import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get, Post, Delete, Middleware } from '@overnightjs/core';
import { JwtManager, ISecureRequest } from '@overnightjs/jwt';
import { Request, Response } from 'express';
import { Logger } from '@overnightjs/logger';

import { Folder } from '../models/Folder';
import { MongooseDocument } from 'mongoose';
 
@Controller('api/folder')
export class FolderController {

    @Get(':userId')
    @Middleware(JwtManager.middleware)
    private getAll(req: ISecureRequest, res: Response) {
        
    }

    @Get(':userId/:id')
    @Middleware(JwtManager.middleware)
    private get(req: ISecureRequest, res: Response) {
        
    }

    @Post('')
    @Middleware(JwtManager.middleware)
    private post(req: ISecureRequest, res: Response) {
      const newFolder = new Folder(req.body);
      newFolder.save((error: Error, folder: MongooseDocument) => {
        if(error) {
          res.status(BAD_REQUEST).json({"msg": error.message})
        } else {
          res.status(OK).json(folder);
        }
      })
    }

    @Post(':id')
    @Middleware(JwtManager.middleware)
    private update(req: ISecureRequest, res: Response) {
        
    }

    @Delete(':id')
    @Middleware(JwtManager.middleware)
    private delete(req: ISecureRequest, res: Response) {
        
    }
}