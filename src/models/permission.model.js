import { getConnection, sql } from "../config/database.js";

export const rolePermissionDB = async (idRol, permissionName) => {
    const pool = getConnection();

    const result = await pool.request()
        .input("IdRol", sql.Int, idRol)
        .input("permissionName", sql.VarChar, permissionName)
        .query(`
            SELECT 1
            FROM RolePermissions rp
            INNER JOIN Permissions p
                ON rp.idPermission = p.id
            WHERE rp.idRol = @idRol
            AND p.name = @permissionName
        `);
    return result.recordset.length > 0;
}

export const getUserPermissionsDB = async (idRol) => {

    const pool = await getConnection();

    const result = await pool.request()
        .input("idRol", sql.Int, idRol)
        .query(`
            SELECT p.name
            FROM RolePermissions rp
            INNER JOIN Permissions p
                ON rp.idPermission = p.id
            WHERE rp.idRol = @idRol
        `);

    return result.recordset.map(permission => permission.name);
};