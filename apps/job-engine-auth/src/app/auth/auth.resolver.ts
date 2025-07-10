import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/models/user.model';
import { LoginInput } from './dto/login.input';
import { AuthService } from './auth.service';
import { GqlContext } from '@job-engine/nestjs';

@Resolver()
export class AuthResolver {
    constructor(private readonly auth: AuthService) {}

    @Mutation(() => User)
    async login(@Args('loginInput') input: LoginInput, @Context() context: GqlContext) {
        return this.auth.login(input, context.res);
    }
}
