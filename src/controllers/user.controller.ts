import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { ResponseData } from "../utils/Response";

export const UserController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAll();
      return ResponseData.ok(res, users);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const user = await UserService.getById(id);
      return ResponseData.ok(res, user);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.create(req.body);
      return ResponseData.created(res, user);
    } catch (error) {
      next(error);
    }
  },

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const user = await UserService.edit(id, req.body);
      return ResponseData.ok(res, user);
    } catch (error) {
      next(error);
    }
  },

  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const user = await UserService.deleteById(id);
      return ResponseData.ok(res, user);
    } catch (error) {
      next(error);
    }
  },
};
