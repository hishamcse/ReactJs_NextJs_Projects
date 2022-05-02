import {MongoClient} from "mongodb";

export const getClient = async () => {
    return await MongoClient.connect(
        `mongodb+srv://${process.env.mongodb_user}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.arwq1.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`);
}

export const connectToDB = async (client) => {
    return client.db();
}

export const closeConnection = async (client) => {
    await client.close();
}