import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
import mongoose from 'mongoose'
import log4js from 'log4js'

import authenticate from './middlewares/authenticate'
// import { DB_NAME } from './config';

const PORT = process.env.PORT || 3333;

let app = express();

//add log4js
log4js.configure({
  appenders: [
    { type: 'console' }, //控制台输出
    {
      type: 'file', //文件输出
      filename: 'logs/access.log',
      maxLogSize: 1024,
      backups: 3,
      category: 'normal'
    }
  ]
});

var logger = log4js.getLogger('normal');
logger.setLevel('INFO');
app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO }));

app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb://localhost:27017');
mongoose.set('debug', true);


console.log('Connect to mongodb');

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', require('./routes/auth'))

app.listen(PORT, () => console.log(`browse to localhost:${PORT}`));