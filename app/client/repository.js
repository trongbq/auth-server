import bcrypt from 'bcrypt';
import { db } from '../lib/database/client';
import { TABLE_CLIENTS, TABLE_USERS } from '../lib/database/tables';
import logger from '../lib/logger';

async function hashPassword(pw) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(pw, salt);
}

export function getClient(clientId) {
  const query = { clientId };
  return db.collection(TABLE_CLIENTS).findOne(query, {});
}

export async function saveUser(username, email, password) {
  const doc = {
    username,
    email,
    password: await hashPassword(password),
    registeredAt: new Date(),
  };
  
  const result = await db.collection(TABLE_USERS).insertOne(doc);
  logger.debug(`Saved user to database: ${result}`);

  return result.insertedId;
}
