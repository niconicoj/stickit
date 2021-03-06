import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get, Post, Delete, Middleware } from '@overnightjs/core';
import { JwtManager, ISecureRequest } from '@overnightjs/jwt';
import { Request, Response } from 'express';
import { Logger } from '@overnightjs/logger';

import { Postit } from '../models/Postit';
import { MongooseDocument } from 'mongoose';
 
@Controller('api/postit')
export class PostitController {

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
      const newPostit = new Postit(req.body);
      newPostit.save((error: Error, postit: MongooseDocument) => {
        if(error) {
          res.status(BAD_REQUEST).json({"msg": error.message});
        } else {
          res.status(OK).json(postit);
        }
      })
    }

    @Post(':id')
    @Middleware(JwtManager.middleware)
    private update(req: ISecureRequest, res: Response) {
        Postit.findByIdAndUpdate(req.params.id, req.body,{new: true} ,(error: Error, postit) => {
          if(error){
            res.status(BAD_REQUEST).json({"msg": error.message});
          } else {
            res.status(OK).json(postit);
          }
        })
    }

    @Delete(':id')
    @Middleware(JwtManager.middleware)
    private delete(req: ISecureRequest, res: Response) {
      Postit.findByIdAndDelete(req.params.id, (error: Error, deleted: any) => {
        if (error) {
          res.status(BAD_REQUEST).json({"msg": error.message});
        }
        res.status(OK).json({"msg": "success"});
      });
    }
}