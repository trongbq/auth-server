import bcrypt from 'bcrypt';
import { db } from '../database/client';
import { TABLE_CLIENTS, TABLE_USERS } from '../database/tables';
import logger from '../logger';

async function hashPassword(pw) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(pw, salt);
}

export function getClient(clientId) {
  const query = { clientId };
  return db.collection(TABLE_CLIENTS).findOne(query, {});
}

export async function saveUser(email, password) {
  const doc = {
    email,
    password: await hashPassword(password),
    registeredAt: new Date(),
  };
  const result = await db.collection(TABLE_USERS).insertOne(doc);
  logger.info(JSON.stringify(result));
  return result.insertedId;
}
