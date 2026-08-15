import { rolePermissionDB} from "../models/permission.model.js";

export const authorize = (permission)  => {

    return async (req, res, next) => {
        try {
            const rolePermission  = await rolePermissionDB(
                req.user.role,
                permission
            );
            if (!rolePermission) {
                return res.status(403).json({
                    message: "No tienes permiso para realizar esta acción"
                });
            }
            next();
        } catch(error) {
            console.log(error);
            return res.status(500).json({
                message: "Error al verficar permisos"
            });
            
        }
    };

};