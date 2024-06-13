const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const Authentication = require('smart-auth-middleware');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginInlineTraceDisabled } = require('apollo-server-core');
const { default: responseCachePlugin } = require('apollo-server-plugin-response-cache');
const SmartHttp = require('smart-http');
const Logger = require('smart-node-logger');
const correlationId = require('correlationid-middleware');
const schema = require('./graphql');

require('./listeners');

const {
  PORT, IDENTITY_SERVICE_URL, NAME,
} = require('./config');

const app = express();

/**
 * Start the app by listening <port>
 * */
// const  = app.listen(PORT);
const server = app.listen(async () => {
  // eslint-disable-next-line no-console
  console.log(
    `Example app listening on port ${PORT}`,
  );
});

const routes = require('./routes');

/**
 * List of all middlewares used in project cors, compression, helmet
 * */
try {
  // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // eslint-disable-next-line global-require
  app.enable('trust proxy');
  app.use(correlationId, SmartHttp());
  app.use(cors({
    exposedHeaders: [ 'message', 'x-coreplatform-paging-limit', 'x-coreplatform-total-records' ],
  }));
  app.use(compression());
  app.use(helmet());
  app.use(express.urlencoded({
    extended: true,
  }));
  app.use(express.json());

  app.use(Authentication({
    IDENTITY_SERVICE_URL,
    AUDIENCE: 'platform',
    ignorePaths: [ '/graphql', '/ping', '/healthcheck', '/test/save' ],
  }));

  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true,
    context: ({ req }) => ({
      user: req && req.user,
      headers: req.headers,
    }),
    plugins: [ ApolloServerPluginInlineTraceDisabled(), responseCachePlugin() ],
    formatError: (error) => {
      // Don't give the specific errors to the client.
      if (error.message.startsWith('Database Error: ')) {
        return new Error('Internal server error');
      }
      const logger = new Logger({ host: NAME, path: `${error.path ? error.path[0] : 'NA'}` });

      logger.log({
        level: 'error',
        meta: {
          message: 'unexpected-internal-server-error',
          details: error.message ? error.message.toString() : error,
        },
      });

      return error;
    },
  });

  app.use('/', routes);
  app.all('/*', (_req, res) => res.notFound());

  apolloServer.start().then(() => {
    apolloServer.applyMiddleware({ app, path: '/graphql' });
  });
} catch (e) {
  server.close();
}

module.exports = server;
