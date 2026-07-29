import { getConnection, sql } from "../config/database.js";
export const getEmployeesDB = async (offset, limit) => {

    const pool = await getConnection();

    const result = await pool
        .request()
        .input("offset", sql.Int, offset)
        .input("limit", sql.Int, limit)
        .query(`
            SELECT *
            FROM Employees
            ORDER BY id
            OFFSET @offset ROWS
            FETCH NEXT @limit ROWS ONLY;
        `);

    const totalResult = await pool
        .request()
        .query(`
            SELECT COUNT(*) AS total
            FROM Employees;
        `);

    return {
        employees: result.recordset,
        total: totalResult.recordset[0].total
    };

};
export const getEmployeeByIdDB = async (id) => {
    const pool = await getConnection();

    const result = await pool
        .request()
        .input("id", sql.Int, id)
        .query(`
            SELECT *
            FROM Employees
            WHERE id = @id
        `);

    return result.recordset[0];
};

export const createEmployeeDB = async (
    name,
    last_name,
    document,
    phone,
    address,
    position
) => {
    const pool = await getConnection();

    const employee = await pool
        .request()
        .input("document", sql.VarChar, document)
        .query(`SELECT id FROM Employees WHERE document = @document`);

    if (employee.recordset && employee.recordset.length > 0) {
        return null;
    }

    const result = await pool
        .request()
        .input("name", sql.VarChar, name)
        .input("last_name", sql.VarChar, last_name)
        .input("document", sql.VarChar, document)
        .input("phone", sql.VarChar, phone)
        .input("address", sql.VarChar, address)
        .input("position", sql.VarChar, position)
        .query(`
            INSERT INTO Employees (name, last_name, document, phone, address, position)
            VALUES (@name, @last_name, @document, @phone, @address, @position)
        `);

    return result;
};

export const updateEmployeeDB = async (
    id,
    name,
    last_name,
    document,
    phone,
    address,
    position
) => {
    const pool = await getConnection();
    const employee = await pool
        .request()
        .input("document", sql.VarChar, document)
        .input("id", sql.Int, id)
        .query(`SELECT id FROM Employees WHERE document = @document AND id != @id`);

    if (employee.recordset && employee.recordset.length > 0) {
        return null;
    }
    const result = await pool
        .request()
        .input("id", sql.Int, id)
        .input("name", sql.VarChar, name)
        .input("last_name", sql.VarChar, last_name)
        .input("document", sql.VarChar, document)
        .input("phone", sql.VarChar, phone)
        .input("address", sql.VarChar, address)
        .input("position", sql.VarChar, position)
        .query(`
            UPDATE Employees
            SET
                name = @name,
                last_name = @last_name,
                document = @document,
                phone = @phone,
                address = @address,
                position = @position
            WHERE id = @id
        `);

    return result;
};

export const deleteEmployeeDB = async (id) => {

    const pool = await getConnection();

    await pool
        .request()
        .input("id", sql.Int, id)
        .query(`
            DELETE FROM Employees
            WHERE id = @id
        `);

};