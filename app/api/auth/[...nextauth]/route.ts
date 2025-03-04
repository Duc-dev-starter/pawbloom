
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.NEXT_AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

// ✅ Cách export đúng cho App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
