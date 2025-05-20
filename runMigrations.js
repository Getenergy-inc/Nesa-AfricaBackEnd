import { sequelize } from './src/config/database.js';
import { Umzug, SequelizeStorage } from 'umzug';


const runMigrations = async () => {
  const umzug = new Umzug({
    migrations: { glob: 'migrations/*.js' }, // adjust path if needed
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });

  await umzug.up(); // run all pending migrations
  console.log('Migrations completed');
};

runMigrations().catch((err) => {
  console.error('Migration error:', err);
  process.exit(1);
});
