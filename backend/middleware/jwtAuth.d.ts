import type { Request, Response, NextFunction } from 'express';
declare const verifyToken: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default verifyToken;
//# sourceMappingURL=jwtAuth.d.ts.map