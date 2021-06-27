import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { ResolverContext } from "#root/graphql/types";
import { UserSession } from "../entitites/UserSession";
import UsersService from "#root/adapters/UsersService";

@InputType()
class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@Resolver((of) => UserSession)
export class UserSessionsResolver {
  @FieldResolver()
  async user(@Root() UserSession: UserSession) {
    const userId = UserSession.userId;
    if (!userId) return (UserSession.user = undefined);

    const user = await UsersService.fetchUserInfo(userId);
    return user;
  }

  @Query((returns) => UserSession)
  async getSession(@Ctx() { req, res }: ResolverContext) {
    if (!res.locals.userSession) {
      return {
        id: null,
        userId: null,
        expiresAt: null,
        createdAt: null,
        user: null,
      };
    }

    return res.locals.userSession;
  }

  @Mutation((returns) => UserSession)
  async login(@Arg("LoginData") { username, password }: LoginInput) {
    const response = UsersService.login(username, password);
    return response;
  }

  @Mutation((returns) => Boolean)
  async logout(@Arg("id") id: string) {
    const response = await UsersService.logout(id);
    console.log(response);

    return response;
  }
}
