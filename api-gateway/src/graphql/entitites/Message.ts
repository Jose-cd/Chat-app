import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Message {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  message: string;

  @Field()
  createdAt: string;
}
