const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const restricted_middleware = require('../auth/restricted-middleware');

const authRouter = require('../data/routers/authRouter');
const usersRouter = require('../data/routers/usersRouter');

const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/restricted', restricted_middleware, usersRouter);

server.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = server;