import bcrypt from 'bcrypt';
import { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/app/libs/prismadb';

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentails',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentails) {
        if (!credentails?.email || !credentails.password) {
          throw new Error('Invalid Credentails');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentails.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentails');
        }

        const isCorrectPassword = await bcrypt.compare(credentails.password, user.hashedPassword);

        if (!isCorrectPassword) {
          throw new Error('Invalid credentails');
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;