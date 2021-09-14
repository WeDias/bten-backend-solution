import Auth from '@middlewares/Auth';
import { Router } from 'express';
import AuthController from '@controllers/AuthController';

const router: Router = Router();

router
  .route('/auth/login')
  .post(AuthController.login);

router
  .route('/auth/logout')
  .get(Auth.authenticate, AuthController.logout);

export const AuthRoutes: Router = router;