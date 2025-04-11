import { resolve } from 'path';

export default {
  'config': resolve('src/config', 'database.js'), // or database.js if you're using that
  'models-path': resolve('src/models/postgresql'),
  'migrations-path': resolve('src/database/migrations'),
//   'seeders-path': resolve('src/database/seeders'),
};
