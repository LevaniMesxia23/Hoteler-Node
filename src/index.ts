import { startServer } from "./server";
import { pool } from "./config/db";
startServer();

async function main() {
  try {
    const response = await pool.query("SELECT NOW()");
    console.log("Database Connected:", response.rows[0].now);
    startServer();
  } catch (error) {
    console.error("Error connecting to database", error);
  }
}

main();