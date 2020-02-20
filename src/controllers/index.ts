import { PostitController } from './PostitController';
import { UserController } from './UserController';

let Rootcontroller = [
  new PostitController(),
  new UserController(),
];

export default Rootcontroller;