import { PostitController } from './PostitController';
import { UserController } from './UserController';
import { FolderController } from './FolderController';

let Rootcontroller = [
  new PostitController(),
  new UserController(),
  new FolderController(),
];

export default Rootcontroller;