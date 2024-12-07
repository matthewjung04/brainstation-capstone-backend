import { MongoClient } from 'mongodb'
import "dotenv/config"

const connectMongoDB = async () => {
  const DB_USER = process.env.DB_USER || 'root';
  const DB_PASSWORD = process.env.DB_PASSWORD || 'rootroot';
  const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@brainstationcapstone.4u1nh.mongodb.net/`;

  const client = new MongoClient(url);
  try {
    await client.connect();
    await listDatabases(client);

  } catch (error) {
    console.error(error);
  }
}

const listDatabases = async (client) => {
  const databaseList = await client.db().admin().listDatabases()
  console.log(`Successfully connected to ${databaseList.databases[0].name} database`)
}

const createEvents = async (client, newUser) => {
  const defaultEvents = await client.db("TimeZest").collection("Events").insertOne(newUser);
}

export default connectMongoDB;