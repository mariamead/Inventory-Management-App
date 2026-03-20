import { Request, Response, NextFunction } from 'express';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateGetProfile = (req: Request, res: Response, next: NextFunction) => {
  next();
};

export const validateUpdateProfile = (req: Request, res: Response, next: NextFunction) => {
  const { name, email } = req.body;
  
  if (!name && !email) {
    return res.status(400).json({ error: 'This field is required' });
  }
  
  if (email && !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }
  
  next();
};