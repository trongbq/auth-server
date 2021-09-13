import { MongoClient } from 'mongodb';
import config from '../config';
import logger from '../logger';

const uri = `mongodb://${config.db.username}:${config.db.password}@${config.db.host}:${config.db.port}`;

const client = new MongoClient(uri);

// TODO: avoid use exported let variable
// eslint-disable-next-line import/no-mutable-exports
let db;

async function connect() {
  try {
    await client.connect();
    db = client.db(config.db.name);
    await db.command({ ping: 1 });
    logger.info('Connected successfully to mongodb server!');
  } catch (err) {
    logger.error(`Can not connect to database: ${err}`);
    await client.close();
    process.exit(1);
  }
}

async function disconnect() {
  logger.info('Closing mongodb server connection!');
  await client.close();
}

export { db, connect, disconnect };

export default client;
