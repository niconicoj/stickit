import { Server } from '@overnightjs/core'
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import RootController from './controllers';
import { MONGO_DB, MONGO_HOST, MONGO_PORT, MONGO_USER, MONGO_PASSWORD } from './constants/contants';

class App extends Server {

  constructor() {
    super();
    this.setConfig();
  }

  private setConfig() {
    //Allows us to receive requests with data in json format
    this.app.use(bodyParser.json({ limit: '50mb' }));

    //Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended:true}));

    //Enables cors   
    this.app.use(cors());

    // connect to mongo
    this.mongoConnect();

    // registering controllers
    super.addControllers(RootController);
  }

  //start the server & listen on given port
  public start(port: string) {
    this.app.listen(port, () => {
      console.log('Server listening on port: ' + port);
    })
  }

  //Connecting to our MongoDB database
  private mongoConnect() { 
    mongoose.Promise = global.Promise;
    console.log("mongodb://"+MONGO_USER+":"+MONGO_PASSWORD+"@"+MONGO_HOST+":"+MONGO_PORT+"/"+MONGO_DB);
    mongoose.connect("mongodb://"+MONGO_USER+":"+MONGO_PASSWORD+"@"+MONGO_HOST+":"+MONGO_PORT+"/"+MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => (console.log("mongo connection ok")));
  }
}

export default new App();