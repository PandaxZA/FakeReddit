import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { MyContext } from './types';
import { UserResolver } from './resolvers/user';
import 'reflect-metadata';
import { PostResolver } from './resolvers/post';
import { HelloResolver } from './resolvers/hello';
import { MikroORM } from '@mikro-orm/core';
import { __prod__, COOKIE_NAME } from './constants';
import mikroConf from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cors from 'cors';

const main = async () => {
  const orm = await MikroORM.init(mikroConf);
  await orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years :)
        httpOnly: true,
        secure: __prod__, // https in production
        sameSite: 'lax', // csrf
      },
      secret: 'blahsdfdsafadsf',
      resave: false,
      saveUninitialized: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('server started on localhost:4000');
  });
};

main();
