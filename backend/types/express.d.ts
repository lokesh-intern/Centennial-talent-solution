
  import JWTPayload from "../types/JWTPayload.ts";


declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload
    }
  }
}
export {}