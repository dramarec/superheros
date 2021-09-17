import dotenv from "dotenv"
dotenv.config();

import { MongoClient } from "mongodb";
import { Database, Superhero } from "../lib/types";

const user = process.env.DB_USER;
const userPassword = process.env.DB_USER_PASSWORD;
const cluster = process.env.DB_CLUSTER;

const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net`;

export const connectDatabase = async (): Promise<Database> => {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = client.db("marveldb");

    return {
        superheros: db.collection<Superhero>("superheros")
    }

}