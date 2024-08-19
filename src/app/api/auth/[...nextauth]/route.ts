import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import nextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
 
 const handler = nextAuth({
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: {label: "Email", type: "email", placeholder: "jsmith"},
                password: {label: "Password" , type: "password", placeholder: "*****"}
            },
            async authorize(credentials, req){
                await connectDB();
                console.log(credentials);
                const userFound = await User.findOne({email: credentials?.email}).select("+password");
                if (!userFound ) throw new Error('Invalid credencials')
                    const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password);
                if (!passwordMatch)throw new Error('Invalid credencials');
                console.log(userFound);
                
                return userFound;
            }

        })
    ],
    callbacks: {
        jwt({ account, token, user, profile, session }){
            if (user) token.user = user;
            console.log(token);
            return token;
        },
        session({session, token}) {
            session.user = token.user as any;
            console.log(session,token);
            return session;
        }
    },
    pages: {
        signIn : "/login"
    }
 });

 export { handler as GET, handler as POST};