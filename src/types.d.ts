import { ValidationError } from 'express-validator';

declare global {
  namespace Express {
    interface Request {
      validatedData?: Record<string, any>;
    }
    interface Response {
      validationErrors?: ValidationError[];
    }
  }
}
