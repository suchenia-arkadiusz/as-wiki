import pg from 'pg';
import {log} from '../config/logger';

export const dbConnect = async (config) => {
  const client = new pg.Client({ ...config });

  return await connect(client, 1);
};

const connect = async (client, attempt) => {
  if (attempt === 6) {
    log.error({}, 'Cannot connect with the database');
    return undefined;
  }

  try {
    log.info({}, `Connecting with the database, attempt ${attempt}`);
    await client.connect();
    return client;
  } catch (err) {
    await sleep(5000);
    return await connect(client, attempt + 1).then(() => {});
  }
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
