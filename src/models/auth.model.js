import { getConnection, sql } from "../config/database";

export const loginDB = async (email) => {
    const pool = await getConnection();
    const result = await pool.request()
    .input("email", sql.VarChar, email)
    .query(`
        SELECT id, name, email, password, idRol
        FROM Users WHERE email = @email`);
    return result.recordset[0];
};