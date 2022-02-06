import { Pool } from 'pg'

const pool = new Pool({
  max: 20,
  connectionString:
    'postgres://qtjfmmzkyrcxqh:47bb4152b540f5c320684bb6fa220d5cd3393d301b1ac0560c21ba1ff6a16bf5@ec2-52-31-201-170.eu-west-1.compute.amazonaws.com:5432/d10sb96m398uej',
  //   user: process.env.POSTGRES_USER,
  //   host: process.env.POSTGRES_HOST,
  //   database: process.env.POSTGRES_DB,
  //   password: process.env.POSTGRES_PASSWORD,
  //   port: process.env.POSTGRES_PORT,
  idleTimeoutMillis: 30000,
  ssl: {
    rejectUnauthorized: false,
  },
})

export default pool
