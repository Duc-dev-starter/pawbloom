import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const handler = NextAuth({
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
