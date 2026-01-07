import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt";
import prisma from "../lib/prisma";
import { ResponseData } from "../utils/Response";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    name: string;
    email: string;
    role?: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token; // sesuaikan nama cookie

  if (!token) {
    return ResponseData.unauthorized(res, "Access token tidak ditemukan");
  }

  try {
    // verify jwt
    const decoded = verifyToken(token) as {
      id: number;
    };

    // ambil user dari DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        // role: true, // aktifkan kalau ada role
      },
    });

    if (!user) {
      return ResponseData.unauthorized(res, "User tidak ditemukan");
    }

    // inject ke request
    req.user = user;

    next();
  } catch (error) {
    return ResponseData.unauthorized(
      res,
      "Token tidak valid atau sudah expired"
    );
  }
};
