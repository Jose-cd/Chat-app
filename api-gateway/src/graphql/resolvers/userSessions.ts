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
import { User } from "../entitites/User";

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

  @Query((returns) => UserSession, {
    description: "Gets current user session & information",
  })
  async getSession(
    @Ctx() { req, res }: ResolverContext,
    @Arg("id") id: string
  ) {
    //* Get Current session data
    const userSessionData = await UsersService.fetchUserSession({
      sessionId: id,
    });

    //* Save in the locals
    res.locals.userSession = userSessionData;

    if (!res.locals.userSession) {
      return {
        id: null,
        userId: null,
        expiresAt: null,
        createdAt: null,
        user: null,
      };
    }

    /**
     * At this point the field resolver for user will do his job
     * Returns the User Session full information
     */
    return res.locals.userSession;
  }

  @Mutation((returns) => UserSession, {
    description: "Login using a username and password",
  })
  async login(@Arg("LoginData") { username, password }: LoginInput) {
    const response = UsersService.login(username, password);
    return response;
  }

  @Mutation((returns) => Boolean, {
    description: "log out of the current session",
  })
  async logout(@Arg("id") id: string) {
    const response = await UsersService.logout(id);
    console.log(response);

    return response;
  }

  @Mutation((retuns) => User, { description: "Register" })
  async register(@Arg("RegisterData") { username, password }: LoginInput) {
    const response = await UsersService.register(username, password);

    return response;
  }
}
