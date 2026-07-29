import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "Clavedeseguridad";

export const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            name: user.name,
            role: user.idRol
        },
        SECRET_KEY,
        {
            expiresIn: "1h"
        }
    );
}