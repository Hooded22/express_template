import {PrismaClient, User} from "@prisma/client";

export class UserRepository {
    private prisma: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    findAll = async (): Promise<User[]> => {
        return this.prisma.user.findMany();
    };

    findById = async (id: number): Promise<User | null> => {
        return this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
    };

    createUser = async (username: string): Promise<User> => {
        return this.prisma.user.create({
            data: {
                username,
            },
        });
    };

    deleteUser = async (id: number): Promise<User> => {
        return this.prisma.user.delete({
            where: {
                id: id,
            },
        });
    };

    findByUsername = async (username: string): Promise<User | null> => {
        return this.prisma.user.findUnique({
            where: {
                username: username,
            },
        });
    };
}