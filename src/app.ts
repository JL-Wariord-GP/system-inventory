import express, { Application } from "express";
import { connectMongoDB, testSQLConnection } from "./config/db";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

app.use(express.json());

// Rutas


// Conexión a bases de datos
const initializeDatabases = async () => {
  await testSQLConnection();
  await connectMongoDB();
};

initializeDatabases();

export default app;
