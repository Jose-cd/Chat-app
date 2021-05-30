import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class UserSession {
  @Field((type) => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  createdAt: string;

  @Field()
  expiresAt: string;
}
