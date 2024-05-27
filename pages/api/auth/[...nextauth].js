import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/backend/models/user";
import bcrypt from "bcryptjs";
import dbConnect from "@/backend/config/dbConnect";

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    session: {
      strategy: "jwt",
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      CredentialsProvider({
        async authorize(credentials, req) {
           dbConnect();  // Ensure dbConnect is awaited

          const { email, password } = credentials;

          const user = await User.findOne({ email }).select("+password");

          if (!user) {
            throw new Error("Invalid Email or Password");
          }

          const isPasswordMatched = await bcrypt.compare(password, user.password);

          if (!isPasswordMatched) {
            throw new Error("Invalid Email or Password");
          }

          return user;
        },
      }),
    ],
    callbacks: {
      async jwt ({ token, user, account, profile })  {
        dbConnect();

        if (account && account.provider === "google") {
          let dbUser = await User.findOne({ email: profile.email });

          if (!dbUser) {
            dbUser = await User.create({
              name: profile.name,
              email: profile.email,
              avatar: {
                url: profile.picture,
              },
              // Additional fields can be added here if necessary
            });
          }

          token.user = dbUser;
          
        } else if (user) {
          token.user = user;
        } else if (token.user) {
          const dbUser = await User.findById(token.user._id);
          token.user = dbUser;
        }

        // Check if req.url is defined and matches
        if (req.url && req.url === "/api/auth/session?update") {
          const updatedUser = await User.findById(token.user._id);
        
          token.user = updatedUser;
        }
        

        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.user;
     
        delete session.user.password;
       
        return session;
      },
     
    },
    pages: {
      signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}
