import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserController } from "../controllers/user.controller";

const router = Router();

router.get("/", authMiddleware, UserController.getAll);
router.get(":/id", authMiddleware, UserController.getById);
router.post("/", authMiddleware, UserController.create);
router.put(":/id", authMiddleware, UserController.edit);
router.delete(":/id", authMiddleware, UserController.deleteById);

export default router;
