declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        campusId: string;
        role: string;
      };
    }
  }
}

export {};