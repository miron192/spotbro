import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      activityLevel: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    activityLevel: string;
  }
}
