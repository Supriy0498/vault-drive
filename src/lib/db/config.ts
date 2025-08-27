import {Pool} from 'pg';

const globalForPg = global as unknown as {
  pgPool: Pool | undefined
}

const db = globalForPg.pgPool ?? new Pool({connectionString: process.env.PG_DB_URL})

if (process.env.NODE_ENV !== 'production') 
    globalForPg.pgPool = db;

export default db;