import NextAuth from 'next-auth';
import Providers from "next-auth/providers";
import {closeConnection, connectToDB, getClient} from "../../../utils/db";
import {verifyPassword} from "../../../utils/auth";

export default NextAuth({
    session: {
        jwt: true
    },

    providers: [

        Providers.Credentials({                       // using our own credentials
            async authorize(credentials) {
                const client = await getClient();
                const db = await connectToDB(client);

                const user = await db.collection('users').findOne({email: credentials.email});

                if (!user) {
                    await closeConnection(client);
                    throw new Error('User not found');
                }

                const isValid = await verifyPassword(credentials.password, user.password);

                if (!isValid) {
                    await closeConnection(client);
                    throw new Error('Could not log you in');
                }

                await closeConnection(client);

                return {email: user.email}
            }
        }),

        Providers.Google({                          // using google (e.g: gmail)
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

            async profile(profile) {
                const client = await getClient();
                const db = await connectToDB(client);

                const user = await db.collection('users').findOne({email: profile.email});

                if (!user) {
                    await closeConnection(client);
                    throw new Error('User not found');
                }

                await closeConnection(client);

                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture
                }
            }
        })
    ]
});