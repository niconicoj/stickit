import { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } from 'http-status-codes';
import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { MongooseDocument } from 'mongoose';
import { OAuth2Client } from 'google-auth-library';
import {G_SIGN_IN_CLIENT_ID } from '../constants/contants';
import { JwtManager } from '@overnightjs/jwt';

import { User } from '../models/User';
 
@Controller('api/user')
export class UserController {
 
  @Post('auth')
  private auth(req: Request, res: Response) {
    const client = new OAuth2Client(G_SIGN_IN_CLIENT_ID);
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: G_SIGN_IN_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      if(payload){
        User.findOne({sub: payload.sub}, (err, user) => {
          if (err) res.status(INTERNAL_SERVER_ERROR).json({"msg":err.message})
          if (user) {
            user.set({token: JwtManager.jwt({email: user.get('email')})});
            user.save();
            res.status(OK).json(user);
          } else {
            const newUser = new User({
              name: payload.name,
              email: payload.email,
              imageUrl: payload.picture,
              sub: payload.sub,
              token: JwtManager.jwt({email: payload.email})
            });
            newUser.save((error: Error, user: MongooseDocument) => {
              if (error) {
                res.status(INTERNAL_SERVER_ERROR).send(error);
              }
              res.status(OK).json(user);
            });
          }
        });
      } else {
        res.status(INTERNAL_SERVER_ERROR).json({msg: "oppsie woopsie"})
      }
    }
    verify().catch((error) => {
      res.status(BAD_REQUEST).json({"msg":"we could not verify your connection token."})
    })
  }
}