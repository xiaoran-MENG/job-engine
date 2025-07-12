import { CanActivate, ExecutionContext, Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ClientGrpc } from "@nestjs/microservices";
import { catchError, map, Observable, of } from "rxjs";
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME, AuthServiceClient } from 'types/proto/auth';

@Injectable()
export class GqlAuthGuard implements CanActivate, OnModuleInit {
    private readonly logger = new Logger(GqlAuthGuard.name);
    private client: AuthServiceClient;

    constructor(@Inject(AUTH_PACKAGE_NAME) private clientGrpc: ClientGrpc) {}

    onModuleInit() {
        this.client = this.clientGrpc.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    }

    // Cookies are set by cookie parser middleware
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const token = this.getRequest(context).cookies?.Authentication;
        if (!token) return false;
        return this.client.authenticate({ token }).pipe(
            map(x => {
                this.logger.log(x);
                return true;
            }),
            catchError(e => {
                this.logger.error(e);
                return of(false);
            })
        );
    }

    private getRequest(context: ExecutionContext) {
        const gqlContext = GqlExecutionContext.create(context);
        return gqlContext.getContext().req;
    }
}