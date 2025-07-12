import { Controller } from "@nestjs/common";
import { log } from "console";
import { Observable } from "rxjs";
import { AuthenticateRequest, AuthServiceController, AuthServiceControllerMethods, User } from "types/proto/auth";

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {

    authenticate(request: AuthenticateRequest): Promise<User> | Observable<User> | User {
        log(request);
        return {} as any;
    }

}