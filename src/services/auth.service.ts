import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user.repository";
import { CreateError } from "../utils/CreateError";
import { signToken } from "../lib/jwt";

export const AuthService = {
  async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw CreateError("Email atau password salah", 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw CreateError("Email atau password salah", 401);

    const token = signToken({ id: user.id, email: user.email });

    return token;
  },
};
