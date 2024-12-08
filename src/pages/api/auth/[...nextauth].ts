import NextAuth from 'next-auth';
import GithubProvider from "next-auth/providers/github";
import db from '@/utils/firestore';
import { collection, doc, getDoc } from 'firebase/firestore';

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
      //scope: 'read:user'
    }),
    // ...add more providers here
  ],

  callbacks: {
    async session(session, profile) {
      try {

        const last = doc(db, 'users', session.token.sub);
        const lastDonate = await getDoc(last).then((snapshot) => {
          if (snapshot.exists) {
            return snapshot.data().lastDonate.toDate();
          } else {
            return null;
          }
        });

        return {
          ...session,
          id: session.token.sub,
          vip: lastDonate ? true : false,
          lastDonate: lastDonate
        }
      } catch {
        return {
          ...session,
          id: null,
          vip: false,
          lastDonate: null
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
export default NextAuth(authOptions);
