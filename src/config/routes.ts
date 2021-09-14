import { UserRoutes } from '@routes/UserRoute';
import { AuthRoutes } from '@routes/AuthRoute';

const API = '/api';

export default (app) => {
  app.use(API, UserRoutes);
  app.use(API, AuthRoutes);
};