import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { ResponseData } from "../utils/Response";
import { signToken } from "../lib/jwt";

export const AuthController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await AuthService.login(email, password);

      const token = signToken({
        id: user.id,
        email: user.email,
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return ResponseData.ok(res, "Login berhasil");
    } catch (error) {
      next(error);
    }
  },

  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      await AuthService.register(name, email, password);

      return ResponseData.created(res, "Register berhasil, silakan login");
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response) {
    res.clearCookie("token");
    return ResponseData.ok(res, "Logout berhasil");
  },
};
