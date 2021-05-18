import { User } from './entities/User';
import { Options } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from './entities/Post';
import path from 'path';

const config: Options = {
  migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations with directory
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Post, User],
  dbName: 'fakereddit',
  type: 'postgresql',
  debug: !__prod__,
  user: 'chrisstrybis',
  password: 'Byakuya12',
};
export default config;
