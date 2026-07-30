import { VarChar } from "mssql";
import { getConnection, sql } from "../config/database.js";
import { hash } from "bcrypt";

export const findUserDB = async (email) => {
    const pool = await getConnection();

    const result = await pool.request()
    .input("email", sql.VarChar, email)
    .query(`
        SELECT * FROM Users WHERE email = @email`);
    return result.recordset[0];
};

export const registerDB = async (
    name, 
    email,
    hashedPassword,
    idRol
) => {
    const pool = await getConnection();
    const result = await pool.request()
    .input("name", sqlVarchar, name).input("email", sqlVarchar, email)
    .input("password", sql.VarChar, hashedPassword).input("idRol", sql.Int, idRol)
    .query(`
        INSERT INTO Users (name, email, password, idRol)
        VALUES (@name, @email, @password, @idRol)`);
};

export const loginDB = async (email) => {
    const pool = await getConnection();
    const result = await pool.request()
    .input("email", sql.VarChar, email)
    .query(`
        SELECT id, name, email, password, idRol
        FROM Users WHERE email = @email`);
    return result.recordset[0];
};