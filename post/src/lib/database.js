const { MongoClient } = require('mongodb');
const logger = require('./logger');

const {
  DB_NAME, DB_USER, DB_PASS, DB_HOST,
} = process.env;

const authMechanism = 'DEFAULT';
const url = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/?authSource=auctor&authMechanism=${authMechanism}`;

const Mongo = new MongoClient(url, { useNewUrlParser: true });
let db;
let isTry2Connect = false;

const Connect2DB = async () => {
  if (!Mongo.isConnected() && !isTry2Connect) {
    logger.info(`Try connecting to [${DB_NAME}] database`);
    isTry2Connect = true;
    try {
      await Mongo.connect();
      db = Mongo.db(DB_NAME);
      await db.collection('log').insertOne({ date: new Date() });
      logger.info(`Successfully connected to [${DB_NAME}]`);
    } catch (err) {
      logger.error(err);
    }
    isTry2Connect = false;
  }
};

// Chk if db is disconnected every 3 seconds.
setInterval(() => { Connect2DB(); }, 3000);

module.exports = db;
