import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Logger } from '@overnightjs/logger';
 
@Controller('api/postit')
export class PostitController {
 
    @Get('')
    private get(req: Request, res: Response) {
        Logger.Info('hit');
        res.status(OK).json({msg: 'yo'});
    }
}