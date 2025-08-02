import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET!,

  session: {
    strategy: "jwt",
  },

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email! },
      });
      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email!,
            name: user.name!,
            image: user.image || "",
            activityLevel: "low",
          },
        });
      }
      return true;
    },
    async jwt({ token }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email! },
      });

      if (dbUser) {
        token.id = dbUser.id;
        token.name = dbUser.name;
        token.email = dbUser.email;
        token.activityLevel = dbUser.activityLevel;
        token.bio = dbUser.bio || "";
        token.image = dbUser.image || "";
        token.weight = dbUser.weight || 0;
        token.height = dbUser.height || 0;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.activityLevel = token.activityLevel as string;
        session.user.bio = token.bio as string;
        session.user.image = token.image as string;
        session.user.weight = token.weight as number;
        session.user.height = token.height as number;
      }

      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/profile`;
    },
  },
};
