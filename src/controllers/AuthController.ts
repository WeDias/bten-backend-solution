import Auth from '@middlewares/Auth';
import { Request, Response } from 'express';
import { User } from '@models/User';
import UserService from '@services/UserService';
import bcrypt from 'bcryptjs';

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { username = null, password = null } = req.body;
      const user: User = await UserService.getUserByUsername(username);
      if (!user) return res.status(404).json({ error: 'User not found' });
      if (!bcrypt.compareSync(password, user.password)) return res.status(403).json({ error: 'Wrong password' });

      await Auth.generateToken(user, res);
      return res.status(200).send({ success: 'login successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.clearCookie(Auth.cookieName);
      return res.status(200).send({ success: 'Logout successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new AuthController();