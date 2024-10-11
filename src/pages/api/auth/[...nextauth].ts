import NextAuth from 'next-auth';
import GithubProvider from "next-auth/providers/github"

/**export default NextAuth({
 
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clienteSecret: process.env.GITHUB_CLIENT_SECRET,
            scope:'read:user'
        }),
    ],

})**/

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session(session, profile) {
      try {
        return {
          ...session,
          id: profile.sub
        }
      } catch {
        return {
          ...session,
          id: null
        }
      }

    },
    async signIn(user, account, profile) {
      const { email } = user;
      try {
        return true;
      } catch (err) {
        console.log('DEU ALGUM ERRO', err);
        return false;

      }
    }
  }
}
export default NextAuth(authOptions)
