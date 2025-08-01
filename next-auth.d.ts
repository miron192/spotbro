// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      activityLevel: string;
      bio: string;
      weight: number;
      height: number;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    activityLevel: string;
    bio: string;
    weight: number;
    height: number;
  }
}
