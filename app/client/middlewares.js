import { getClient } from "./repository";

export async function clientAuthenticate(req, res, next) {
  // Validate and extract token
  const auth = req.headers['authorization'];
  if (!auth) {
    res.status(401).end('No authorization header!');
    return;
  }

  // Extract client credential
  const clientCred = Buffer.from(auth.slice('Basic '.length), 'base64').toString().split(':');
  if (clientCred.length != 2) {
    res.status(401).end('Invalid authorization value format!');
    return;
  }
  const clientId = clientCred[0];
  const clientSecret = clientCred[1];

  // Validate client_id and client_password
  const client = await getClient(clientId);
  if (!client) {
    res.status(401).end('Invalid client!');
    return;
  }

  if (client.clientSecret != clientSecret) {
    res.status(401).end('Invalid client credential!');
    return;
  }

  // Valid!
  next();
}
