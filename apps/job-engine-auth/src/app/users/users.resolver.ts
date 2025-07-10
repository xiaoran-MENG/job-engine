import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { TokenPayload } from '../auth/dto/token-payload.interface';
import { log } from 'console';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Mutation(() => User)
    async createUser(@Args('createUserInput') input: CreateUserInput) {
        return this.usersService.createUser(input);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [User], { name: 'users' })
    async getUsers(@CurrentUser() { userId }: TokenPayload) {
        log(userId);
        return this.usersService.getUsers();
    }
}
