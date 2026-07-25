import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const dbSettings = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,

    options = {
        encrypt: false,
        trustServerCertificade: true
    }
};

export async function getConnection() {
    try {
        const pool = await sql.connect(dbSettings);
        console.log("CONEXION EXITOSA A SQL SERVER");
        return pool;
    }catch(error) {
        console.error(error);
    }
    
}

export {sql};