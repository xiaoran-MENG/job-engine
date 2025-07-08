import { AbstractModel } from '@job-engine/nestjs';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User extends AbstractModel {
    @Field()
    email: string;
}