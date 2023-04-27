import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook";

// import prisma from '@/app/libs/prismadb';
import bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const authOptions: AuthOptions = {
    // adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
          }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
          }),
        CredentialsProvider ({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type: 'text'},
                password: {label: 'password', type: 'password'}
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials.password) {
                    throw new Error('Invalid credentials')
                }

                const user = await prisma.user.findUnique(
                    {
                        where: {email: credentials.email
                        }
                    })
                
                if(!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials')
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password, user.hashedPassword
                )

                if(!isCorrectPassword){
                    throw new Error('Invalid credentials')
                }

                return user;
            } 
        })
    ],
    pages: {
        signIn: '/'
    },
    debug: process.env.NODE_ENV !== 'production',
    session: {
        strategy: 'jwt'
    },
    // callbacks: {
    //     async session({ session, token }: any) {
    //       if (session.user) {
    //         session.user.id = token.sub as string;
    //       }
    //       // if (user?.isAdmin) token.isAdmin = user.isAdmin;
    //       return session;
    //     },
    //     async jwt({ token, user, profile }: any) {
    //         if (user?._id) {
    //             token._id = user._id;
    //             token.accessToken = user.access_Token
    //             token._id = profile.id
                
                
    //         }console.log('token', token._id)
    //         return token;
    //     },
    //   },
    callbacks: {
        session: ({ session, token }) => {
          console.log("Session Callback", { session, token });
          return {
            ...session,
            user: {
              ...session.user,
              id: token.id,
              randomKey: token.randomKey,
            },
          };
        },
        jwt: ({ token, user }) => {
            console.log("JWT Callback", { token, user });
            if (user) {
              const u = user as unknown as any;
              return {
                ...token,
                id: u.id,
                randomKey: u.randomKey,
              };
            }
            return token;
          },
    },

    secret: process.env.NEXTAUTH_SECRET
    
};

export default NextAuth(authOptions);


