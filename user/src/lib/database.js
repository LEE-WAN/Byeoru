const { MongoClient } = require('mongodb');
const logger = require('./logger');

const {
  DB_NAME, DB_USER, DB_PASS, DB_HOST,
} = process.env;

const authMechanism = 'DEFAULT';
const url = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/?authSource=auctor&authMechanism=${authMechanism}`;

const result = {};
result.Mongo = new MongoClient(url, { useNewUrlParser: true });

let isTry2Connect = false;

const Connect2DB = async () => {
  if (!result.Mongo.isConnected() && !isTry2Connect) {
    logger.info(`Try connecting to [${DB_NAME}] database`);
    isTry2Connect = true;
    try {
      await result.Mongo.connect();
      result.db = result.Mongo.db(DB_NAME);
      await result.db.collection('log').insertOne({ date: new Date() });
      logger.info(`Successfully connected to [${DB_NAME}]`);
    } catch (err) {
      logger.error(err);
    }
    isTry2Connect = false;
  }
};

Connect2DB();

result.getNextCount = async (sequenceName) => {
  const col = await result.db.collection('counters');
  const sequenceDocument = await col.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    {
      upsert: true,
      returnNewDocument: true,
    },
  );
  return sequenceDocument.value.sequence_value;
};

// Chk if db is disconnected every 3 seconds.
setInterval(() => { Connect2DB(); }, 3000);

module.exports = result;
