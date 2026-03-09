import type { Request, Response } from "express";
interface LoginBody {
    email: string;
    password: string;
}
export declare const registerController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const loginController: (req: Request<{}, {}, LoginBody>, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=applicantController.d.ts.map