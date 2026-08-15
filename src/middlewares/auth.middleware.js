import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET || "Clavedeseguridad";

export const verifyToken = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: "Token no proporcionado."
            });
        }
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Formato de token inválido."
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(
            token,
            SECRET_KEY
        );
        req.user = decoded;
        next();

    } catch (error) {

        console.error(error);

        return res.status(401).json({
            message: "Token inválido o expirado."
        });

    }

};