// import * as path from "path";
// import * as fs from "fs";

import {MongoClient} from "mongodb";

const Handler = async (req, res) => {
    if(req.method === 'POST') {
        const email = req.body.email;

        if(!email || !email.indexOf('@')) {
            res.status(422).send({message: 'Invalid email address'});
            return;
        }

        const obj = {
            id: new Date().toISOString(),
            email: email
        }

        // file system
        // const filePath = path.join(process.cwd(), 'data', 'register.json');
        // const data = JSON.parse(fs.readFileSync(filePath));
        // data.push(obj);
        // fs.writeFileSync(filePath, JSON.stringify(data))

        // mongodb
        try {
            const client = await MongoClient.connect(
                'mongodb+srv://hishamcse:UtgzBJOQLRqG8O8z@cluster1.arwq1.mongodb.net/newsletter?retryWrites=true&w=majority')

            const db = client.db();
            await db.collection('emails').insertOne({email: email})
            await client.close();
        } catch(error) {
            return res.status(500).json(error);
        }

        res.status(201).send({email: obj.email});
    }
}

export default Handler;