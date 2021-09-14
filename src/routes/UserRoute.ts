import { Router } from 'express';
import UserController from '@controllers/UserController';

const router: Router = Router();

router
  .route('/user')
  .post(UserController.addUser)
  .get(UserController.getUsers);

router
  .route('/user/:userId')
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

export const UserRoutes: Router = router;