import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions : NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:3000/api/auth/signin", {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify(credentials)
        })

        const user = await res.json()
  
        if (user && user.email) {
          return user
        } else {
          throw new Error(`${user.message}`)
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
}
export default NextAuth(authOptions)