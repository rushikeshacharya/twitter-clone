import axios from "axios";
import { prismaClient } from "../../client/db";
import JWTService from "../../services/jwt";
import { GraphqlContext } from "../../interfaces";

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const googleToken = token;
    const googleOauthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
    googleOauthURL.searchParams.set("id_token", googleToken);

    const { data } = await axios.get(googleOauthURL.toString(), {
      responseType: "json",
    });

    const user = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      await prismaClient.user.create({
        data: {
          email: data.email,
          firstName: data.given_name,
          lastName: data.family_name,
          profileImageURL: data.picture,
        },
      });
    }
    const userInDb = await prismaClient.user.findUnique({
      where: { email: data.email },
    });
    if (!userInDb) throw new Error("USer with email not found");

    const userToken = JWTService.generateTokenForUser(userInDb);
    return userToken;
  },
  getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {
    const id = ctx.user?.id;
    if (!id) return null;
    const user = await prismaClient.user.findUnique({ where: { id } });
    return user;
  },
};

export const resolvers = { queries };
