import {getSession} from "next-auth/client";
import {closeConnection, connectToDB, getClient} from "../../../utils/db";
import {hashPassword, verifyPassword} from "../../../utils/auth";

const Handler = async (req, res) => {
    if (req.method !== 'PATCH') {
        return;
    }

    const session = await getSession({req: req});

    if (!session) {
        return res.status(401).json({message: 'Not Authenticated'});
    }

    const userEmail = session.user.email;
    const {oldPassword, newPassword} = req.body;

    const client = await getClient();
    const db = await connectToDB(client);

    const existingUser = await db.collection('users').findOne({email: userEmail});

    if (!existingUser) {
        await closeConnection(client);
        return res.status(404).json({message: 'User not found'});
    }

    const oldPasswordMatch = await verifyPassword(oldPassword, existingUser.password);

    if (!oldPasswordMatch) {
        await closeConnection(client);
        return res.status(403).json({message: 'Old password did not match'});
    }

    const hashedPassword = await hashPassword(newPassword);

    await db.collection('users').updateOne({email: userEmail},
        {$set: {password: hashedPassword}})

    await closeConnection(client);
    return res.status(200).json({message: 'Password updated successfully'})
}

export default Handler;