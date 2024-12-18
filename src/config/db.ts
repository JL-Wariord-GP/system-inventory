import { Sequelize } from "sequelize";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

// ==============================
// Configuración para Sequelize (SQL)
// ==============================
const sequelize = new Sequelize(
  process.env.SQL_DATABASE || "mydb",
  process.env.SQL_USER || "root",
  process.env.SQL_PASSWORD || "",
  {
    host: process.env.SQL_HOST || "localhost",
    dialect: (process.env.SQL_DIALECT as any) || "mysql", // Cambiamos a 'postgres' si requerimos usar PostgreSQL
    logging: false, 
  }
);

// ==============================
// Configuración para Mongoose (MongoDB)
// ==============================
const connectMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/mydb";
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// ==============================
// Probar Conexión a SQL
// ==============================
const testSQLConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("SQL Database connected successfully!");
  } catch (error) {
    console.error("Unable to connect to SQL database:", error);
    process.exit(1);
  }
};

// Exportar conexiones
export { sequelize, connectMongoDB, testSQLConnection };
