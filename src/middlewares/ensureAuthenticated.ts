import { Request, Response, NextFunction } from 'express';
import { verify, decode } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // Validando o token
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error('JWT is missing');
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    // aqui irei forcar que meu decoded e to tipo tokenPayload
    const { sub } = decoded as TokenPayload;
    req.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
