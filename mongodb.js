import { MongoClient } from 'mongodb'
import "dotenv/config"

const connectMongoDB = async () => {
  const DB_USER = process.env.DB_USER || 'root';
  const DB_PASSWORD = process.env.DB_PASSWORD || 'rootroot';
  const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@brainstationcapstone.4u1nh.mongodb.net/`;

  const client = new MongoClient(url);
  try {
    await client.connect();

    /* List all databases in current cluster */
    await listDatabases(client);

    /* Create a new user in Users collection */
    

  } catch (error) {
    console.error(error);
  }
}

const creatUsers = async (client, newUser) => {
  const registeredUser = await client.db("TimeZest").collection("Users").insertOne(newUser);
  console.log(`New User created with the following id: ${registeredUser.insertedId}`);
}

const listDatabases = async (client) => {
  const databaseList = await client.db().admin().listDatabases()
  databaseList.databases.forEach(db => {console.log(`database: ${db.name}`)})
}

export default connectMongoDB;