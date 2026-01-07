import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { ResponseData } from "../utils/Response";

export const AuthController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const token = await AuthService.login(email, password);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_DEV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return ResponseData.ok(res, "Login Berhasil");
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response) {
    res.clearCookie("token");
    return ResponseData.ok(res, "Logout Berhasil");
  },
};
