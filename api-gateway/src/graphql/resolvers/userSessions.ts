import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class UserSessionsResolver {
  @Query((returns) => Boolean)
  async getSession(@Arg("me") me: boolean) {
    return true;
  }
}
