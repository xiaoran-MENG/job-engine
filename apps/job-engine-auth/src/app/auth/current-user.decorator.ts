import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentUser = createParamDecorator(
    // JWT strategy sets the user on the request on validate
    (_data: unknown, context: ExecutionContext) => 
        GqlExecutionContext.create(context).getContext().req.user
)