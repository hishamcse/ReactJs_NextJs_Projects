import {closeConnection, connectToDB, getClient} from "../../../utils/db";
import {hashPassword} from "../../../utils/auth";

const Handler = async (req, res) => {

    if(req.method === 'POST') {
        const {email, password} = req.body;

        if (!email || !email.includes('@') || !password || password.trim().length < 7) {
            return res.status(422).json({message: 'Inputs not valid'});
        }

        const hashedPassword = await hashPassword(password);

        const client = await getClient();
        const db = await connectToDB(client);

        const existingUser = await db.collection('users').findOne({email});

        if(existingUser) {
            res.status(422).json({message: 'User already exists'});
            await closeConnection(client);
            return;
        }

        await db.collection('users').insertOne({
            email: email,
            password: hashedPassword
        })

        res.status(201).json({message: 'User created successfully'})
        await closeConnection(client);
    }
}

export default Handler;