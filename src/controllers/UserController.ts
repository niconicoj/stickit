import { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } from 'http-status-codes';
import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { MongooseDocument, Document } from 'mongoose';
import { OAuth2Client } from 'google-auth-library';
import {G_SIGN_IN_CLIENT_ID } from '../constants/contants';
import { JwtManager } from '@overnightjs/jwt';

import { User } from '../models/User';
import { Folder } from '../models/Folder';
 
@Controller('api/user')
export class UserController {
 
  @Post('auth')
  private auth(req: Request, res: Response) {
    //init google auth client
    const client = new OAuth2Client(G_SIGN_IN_CLIENT_ID);

    // verifying client token
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: G_SIGN_IN_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      // if payload ok, proceed
      if(payload){

        // checking if user already exsist using google sub id. 
        User.findOne({sub: payload.sub}, (err, user) => {
          if (err) res.status(INTERNAL_SERVER_ERROR).json({"msg":err.message})
          //user exsists, generate a token for him and send info
          if (user) {
            user.set({token: JwtManager.jwt({email: user.get('email')})});
            user.save();
            res.status(OK).json(user);
          //user doesn't exist, create one
          } else {
            // creating user
            const newUser = new User({
              name: payload.name,
              email: payload.email,
              imageUrl: payload.picture,
              sub: payload.sub,
              token: JwtManager.jwt({email: payload.email})
            });
            //saving user
            newUser.save((error: Error, user: Document) => {
              if (error) {
                res.status(INTERNAL_SERVER_ERROR).send(error);
              }
              //creating user root folder
              const rootFolder = new Folder({
                userId: user.get('_id'),
                name: 'root'
              });
              // saving root folder
              rootFolder.save((error: Error, folder: Document) => {
                if (error) {
                  res.status(INTERNAL_SERVER_ERROR).send(error);
                }
                //adding rootFolder id to user object and saving
                user.set('rootFolder', folder._id).save((error: Error, endUser: MongooseDocument) => {
                  if (error) {
                    res.status(INTERNAL_SERVER_ERROR).send(error);
                  }
                  res.status(OK).json(endUser);
                });
              })
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