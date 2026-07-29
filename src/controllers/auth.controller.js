import { loginDB } from "../models/auth.model.js";
import { generateToken } from "../utils/jwt.js";

export const loginCont = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email y contraseña son obligatorios."
            });
        }
        const user = await loginDB(email);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado."
            });
        }
        if (password !== user.password) {
            return res.status(401).json({
                message: "Contraseña incorrecta."
            });
        }

        const token = generateToken(user);

        return res.status(200).json({
            message: "Login exitoso.",
            token
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Error interno del servidor."
        });

    }
};