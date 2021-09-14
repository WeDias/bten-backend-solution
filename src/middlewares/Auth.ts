import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { User } from '@models/User';
import { NextFunction, Response } from 'express';
import RequestWithUser from '@interfaces/RequestWithUser';

class Auth {
  public cookieName: string;
  private expiresIn: number;
  private secretKey: string;

  constructor() {
    this.expiresIn = 3600;
    this.cookieName = 'jwtoken';
    this.secretKey = '$2a$10$3QJAyo9CSZiTWGjLVD0/4eQKdnTaoZuyvmtDRNT37s2IZPEWPeeLi';
  }

  authenticate = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const token: string = req.cookies.jwtoken;
      req.user = await promisify(jwt.verify)(token, this.secretKey);
      return next();
    } catch (error) {
      return res.status(403).send({ error: 'Authentication failed' });
    }
  }

  generateToken = (user: User, res: Response) => {
    const token: string = jwt.sign({ ...user }, this.secretKey, { expiresIn: this.expiresIn });
    res.cookie(this.cookieName, token, { httpOnly: true, maxAge: this.expiresIn * 1000 });
  }
}

export default new Auth();