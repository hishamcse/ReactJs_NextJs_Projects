// import * as path from "path";
// import * as fs from "fs";
import {MongoClient} from "mongodb";

const Handler = async (req, res) => {

    let client;

    try {
        client = await MongoClient.connect(
            'mongodb+srv://hishamcse:UtgzBJOQLRqG8O8z@cluster1.arwq1.mongodb.net/comments?retryWrites=true&w=majority');

        if (req.method === 'POST') {

            const eventId = req.query.eventId;
            const {name, email, text} = req.body;

            // validation needed here. must in server side. as frontend validation can be changed

            const comment = {
                eventId, name, email, text
            }

            // file system
            // const filePath = path.join(process.cwd(), 'data', 'comments.json');
            // const data = JSON.parse(fs.readFileSync(filePath));
            // data.push(comment);
            // fs.writeFileSync(filePath, JSON.stringify(data))

            // mongodb
            const db = client.db();
            const result = await db.collection('comments').insertOne(comment);
            // console.log(result)
            comment._id = result.insertedId;

            res.status(201).send({comment: comment});
        }

        if (req.method === 'GET') {

            // file system
            // const filePath = path.join(process.cwd(), 'data', 'comments.json');
            // const data = JSON.parse(fs.readFileSync(filePath));
            // const requiredData = data.filter(comment => comment.eventId === req.query.eventId);
            // res.status(200).send({comments: requiredData});

            // mongodb
            const db = client.db();
            const requiredData = await db.collection('comments')
                .find({eventId: req.query.eventId})
                .sort({_id: -1})                         // descending (_id:-1)
                .toArray();

            res.status(200).send({comments: requiredData});
        }
    } catch (error) {
        res.status(500).send({error: error})
    } finally {
        if(client) {
            await client.close();
        }
    }
}

export default Handler;