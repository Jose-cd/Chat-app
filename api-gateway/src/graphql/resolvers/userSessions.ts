import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { ResolverContext } from "#root/graphql/types";
import { UserSession } from "../entitites/UserSession";
@Resolver()
export class UserSessionsResolver {
  @Query((returns) => UserSession)
  async getSession(
    @Arg("me") me: boolean,
    @Ctx() { req, res }: ResolverContext
  ) {
    if (!me) return "Unsuppoorted arg";

    return res.locals.userSession;
  }
}
