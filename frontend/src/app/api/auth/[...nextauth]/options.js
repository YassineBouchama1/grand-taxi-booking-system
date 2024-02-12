
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    CredentialsProvider({
      credentials: {},

      async authorize(credentials) {
       console.log(credentials)
 
        return {user:'yassine',token:'tkknyassine'};
      },
    }),
  ],
//   callbacks: {
//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.user.isActive = token.isActive;
//       session.user.role = token.role;

//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.isActive = user.isActive;
//         token.role = user.role;

//         console.log({ user });
//       }
//       return token;
//     },

//     //this fun to hanlde activing accounts
//     async signIn({ user }) {
//       console.log(user.isActive);
//       if (user.isActive) {
//         return true;
//       } else {
//         // Return false to display a default error message
//         return false;
//       }
//     },
//   },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    // signOut: "/",
  },
};