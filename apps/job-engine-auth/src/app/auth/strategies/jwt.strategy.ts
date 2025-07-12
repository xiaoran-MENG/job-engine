import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../dto/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: any) => req.cookies?.Authentication || req.token // GRPC authenticate request
            ]),
            secretOrKey: configService.getOrThrow('JWT_SECRET')
        });
    }

    // Passport creates a user property on the request object and set it to the return value
    // user = { userId }
    validate(payload: TokenPayload) {
        return payload;
    }

}