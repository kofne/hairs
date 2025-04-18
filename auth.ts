import NextAuth, { type DefaultSession, type Session, type User as NextAuthUser } from "next-auth"
import { JWT } from "next-auth/jwt"
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"

type UserRole = "USER" | "ADMIN"

type UserType = {
  id: string
  email: string
  name: string | null
  role: UserRole
}

// Extend the built-in session types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: UserRole
    } & DefaultSession["user"]
  }

  interface User {
    id?: string | undefined
    email?: string | null | undefined
    name?: string | null | undefined
    role?: UserRole | undefined
  }
}

// Extend the built-in JWT types
declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: UserRole
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<UserType | null> {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid credentials")
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user || !user.password) {
            throw new Error("User not found")
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          )

          if (!isPasswordValid) {
            throw new Error("Invalid password")
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role as UserRole,
          }
        } catch (error) {
          return null
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }): Promise<Session> {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        }
      }
    },
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        return {
          ...token,
          id: user.id as string,
          role: user.role as UserRole,
        }
      }
      return token
    }
  }
})
