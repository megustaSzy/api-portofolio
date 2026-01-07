import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user.repository";
import { CreateError } from "../utils/CreateError";

export const AuthService = {
  async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw CreateError("Email atau password salah", 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw CreateError("Email atau password salah", 401);

    return user;
  },

  async register(name: string, email: string, password: string) {
    const exists = await UserRepository.findByEmail(email);
    if (exists) throw CreateError("Email sudah digunakan", 400);

    const hashedPassword = await bcrypt.hash(password, 10);

    return UserRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  },
};
