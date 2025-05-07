// filepath: c:\Users\Gianfranco\Documents\Programacion\Report Manager\BackendReport\src\types\express.d.ts
import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        [key: string]: any;
      }
    }
  }
}