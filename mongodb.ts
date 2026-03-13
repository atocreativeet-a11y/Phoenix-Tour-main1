// src/lib/mongodb.ts
import { MongoClient, Db } from "mongodb";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Use a global variable to maintain a cached connection in dev mode
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient>;
}

const uri = process.env.MONGODB_URI;
const options = {};

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable so we don't create multiple connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri!, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, it's fine to create a new client
  client = new MongoClient(uri!, options);
  clientPromise = client.connect();
}

/**
 * getDB - returns the connected MongoDB database instance
 */
export async function getDB(dbName?: string): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName); // defaults to database in connection string if dbName is undefined
}

export default clientPromise;