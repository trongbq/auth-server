import { MongoClient} from 'mongodb';
import config from '../config';

const uri = 
  `mongodb://${config.db.username}:${config.db.password}@${config.db.host}:${config.db.port}`;

const client = new MongoClient(uri)

let db;

async function init() {
  try {
    await client.connect();

    const db = client.db(config.db.name);
    db.command({ping: 1});
    console.log('Connected successfully to mongodb server!');
  } catch (err) {
    console.error(`Can not connect to database: ${err}`)
    await client.close();
    process.exit(1);
  }
}

async function close() {
  console.log('Closing mongodb server connection!')
  await client.close();
}

export { db, init, close };

export default client;
