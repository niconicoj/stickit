import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Logger } from '@overnightjs/logger';
 
@Controller('api/postit')
export class PostitController {
 
    @Get('')
    private get(req: Request, res: Response) {
        Logger.Info('hit');
        res.status(200).json({msg: 'yo'});
    }
}