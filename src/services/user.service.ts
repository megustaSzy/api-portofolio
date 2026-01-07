import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import { CreateUser, UpdateUser } from "../types/user";
import { CreateError } from "../utils/CreateError";

export const UserService = {
  async getAll() {
    return UserRepository.findAll();
  },

  async getById(id: number) {
    const user = await UserRepository.findById(id);
    if (!user) throw CreateError("id tidak ditemukan", 404);
    return user;
  },

  async create(data: CreateUser) {
    const exists = await UserRepository.findByEmail(data.email);
    if (exists) throw CreateError("email sudah digunakan", 400);

    const hashed = await bcrypt.hash(data.password, 10);

    return UserRepository.create({
      ...data,
      password: hashed,
    });
  },

  async edit(id: number, data: UpdateUser) {
    const user = await UserRepository.findById(id);
    if (!user) throw CreateError("id tidak ditemukan", 404);

    return UserRepository.edit(id, data);
  },

  async deleteById(id: number) {
    const user = await UserRepository.findById(id);
    if (!user) throw CreateError("id tidak ditemukan", 404);

    return UserRepository.deleteById(id);
  },
};
