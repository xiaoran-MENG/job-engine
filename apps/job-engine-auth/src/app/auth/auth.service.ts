import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './dto/token-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    async login({ email, password }: LoginInput, res: Response) {
        const user = await this.verifyUser(email, password);
        const expires = new Date();
        expires.setMilliseconds(expires.getTime() + parseInt(this.configService.getOrThrow('JWT_EXPIRATION_MS')));
        const payload: TokenPayload = { userId: user.id };
        const token = this.jwtService.sign(payload);
        res.cookie('Authentication', token, {
            httpOnly: true, // This cookie is only accessible by the web server, not the client-side JavaScript
            secure: this.configService.get('NODE_ENV') === 'production', // Only sends the cookie with HTTPS in prod. The cookie is ecrypted. 
            expires
        });
        return user;
    }

    private async verifyUser(email: string, password: string) {
        try {
            const user = await this.usersService.getUser({ email });
            const authenticated = await compare(password, user.password);
            if (!authenticated) throw new UnauthorizedException();
            return user;
        } catch (error) {
            throw new UnauthorizedException("Invalid credentials");
        }
    }
}
