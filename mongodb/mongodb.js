import { MongoClient } from 'mongodb'
import "dotenv/config"

const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'rootroot';
const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@brainstationcapstone.4u1nh.mongodb.net/`;

const client = new MongoClient(url);

export const connectMongoDB = async () => {
  try {
    await client.connect();
    await listDatabases(client);

  } catch(err) {
    console.error(err);
  }
}

const listDatabases = async (client) => {
  const databaseList = await client.db().admin().listDatabases()
  console.log(`Successfully connected to ${databaseList.databases[0].name} database`)
}

export const searchMongoDB = async (term) => {
  try {
    const collection = client.db('TimeZest').collection('Events');
    const searchResult = await collection.aggregate([
      {
        "$search": {
          "autocomplete": {
            "query": `${term}`,
            "path": "eventName",
            "fuzzy": {
              "maxEdits": 2
            }
          }
        }
      }
    ]).toArray();
    return(searchResult)

  } catch(err) {
    console.error(err)
  }
}