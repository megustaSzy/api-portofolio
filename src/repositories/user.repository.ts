import prisma from "../lib/prisma";
import { CreateUser, UpdateUser } from "../types/user";

export const UserRepository = {
  findAll() {
    return prisma.user.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  },

  findByEmail(email: string) {
    return prisma.user.findFirst({ where: { email } });
  },

  create(data: CreateUser) {
    return prisma.user.create({ data });
  },

  edit(id: number, data: UpdateUser) {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  deleteById(id: number) {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  },
};
