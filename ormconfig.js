const dbconfig = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [
    'src/models/*.{ts,js}',
  ],
  migrations: [
    'src/database/migration/*.{ts,js}',
  ],
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/database/migration',
  },
};

if (process.env.NODE_ENV !== 'dev') {
  dbconfig.entities = ['dist/models/*.{ts,js}'];
  dbconfig.ssl = true;
  dbconfig.extra = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

export default dbconfig;