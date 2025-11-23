import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'example@gmail.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                if (!credentials?.email)
                    throw new Error('Please provide email');
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });
                if (!user) {
                    throw new Error('User not found!');
                }
                if (!user.password) {
                    throw new Error(
                        'this email is already linked with other login methods'
                    );
                }
                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (!isPasswordCorrect) {
                    throw new Error('Invalid Credentials!');
                }
                return user;
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                const email = profile?.email || user?.email;
                if (!email) throw new Error('Profile Not Received!');
                const isUserExists = await prisma.user.findUnique({
                    where: { email: email },
                });
                if (isUserExists) {
                    return true;
                }
                await prisma.user.create({
                    data: {
                        email: email,
                        name: profile?.name || user?.name,
                        profilePicture: profile?.picture || profile?.avatar_url,
                        role: 'USER'
                    },
                });
                return true;
            } catch (err) {
                console.log(err.message);
                return false;
            }
        },
        async jwt({ token, account, user }) {
            if (user) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email },
                });
                token.id = dbUser.id;
                token.name = dbUser.name;
                token.email = dbUser.email;
                token.picture = dbUser.profilePicture;
                token.role = dbUser.role;
            }
            return token;
        },
        async session({ session, token, user }) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.picture = token.picture;
            session.user.role = token.role;
            return session;
        },
        async redirect({ url, baseUrl }) {
            return `${baseUrl}/`;
        },
    },
};
