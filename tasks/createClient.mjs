import { MongoClient } from 'mongodb';
import crypto from 'crypto';

var uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
const client = new MongoClient(uri);

async function createClient(clientId) {
  try {
    const doc = {
      clientId: clientId,
      clientSecret: crypto.randomBytes(23).toString('hex'),
      createdAt: new Date(),
    }
    await client.connect();
    const database = client.db(process.env.DB_NAME);
    const result = await database.collection('clients').insertOne(doc);
    console.log(`A client is created with _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

const clientId = process.env.CLIENT_ID;
if (!clientId) {
  console.error('Client ID is required, please set CLIENT_ID!');
  process.exit(1);
}

console.log(`Creating client with client_id: ${clientId}`);
await createClient(clientId);
console.log('DONE');
