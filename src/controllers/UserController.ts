import { Request, Response } from 'express';
import { User } from '@models/User';
import UserService from '@services/UserService';

class UserController {
  async addUser(req: Request, res: Response) {
    try {
      const userBody: User = req.body;
      if (!userBody) return res.status(400).json({ error: 'userBody is missing' });

      const user: User = await UserService.addUser(userBody);
      if (!user) return res.status(404).json({ error: 'Error when registering user' });

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const user: User[] = await UserService.getUsers();
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const { userId = null } = req.params;
      if (!userId) return res.status(400).json({ error: 'UserId is missing' });

      const user: User = await UserService.getUser(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { userId = null } = req.params;
      const userBody: User = req.body;
      if (!userId) return res.status(400).json({ error: 'UserId is missing' });

      const user: User = await UserService.updateUser(userId, userBody);
      if (!user) return res.status(404).json({ error: 'User not found' });

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { userId = null } = req.params;
      if (!userId) return res.status(400).json({ error: 'UserId is missing' });

      const wasDeleted = await UserService.deleteUser(userId);
      if (!wasDeleted) return res.status(404).json({ error: 'User not found' });

      return res.status(200).json({ success: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();