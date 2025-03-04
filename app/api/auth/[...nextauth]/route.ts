
import NextAuth, { NextAuthOptions } from "next-auth"
import Google from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.NEXT_AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
