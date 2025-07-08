import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma-clients/job-engine-auth';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(input: Prisma.UserCreateInput) {
        return this.prisma.user.create({
            data: {
                ...input,
                password: await hash(input.password, 10)
            }
        })
    }

    async getUsers() {
        return this.prisma.user.findMany();
    }
}
