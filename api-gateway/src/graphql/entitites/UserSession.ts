import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class UserSession {
  @Field((type) => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  userId: string;

  @Field({ nullable: true })
  createdAt: string;

  @Field({ nullable: true })
  expiresAt: string;

  @Field({ nullable: true })
  user?: User;
}
