import { findUserDB, registerDB, loginDB } from "../models/auth.model.js";
import { generateToken } from "../utils/jwt.js";
import { comparePassword } from "../utils/bcrypt.js";
import { errorResponse, successResponse } from "../utils/responses.js";

export const registerCont = async (req, res) => {
    try {
        const { name,
            email,
            password,
            idRol
        } = req.body;
        if (
            !name ||
            !email ||
            !password ||
            !idRol
        ) {
            return errorResponse(
                res,
                "Todo los campos son obligatorios",
                400
            );
            const existingUser = await findUserDB(email);
            if (existingUser) {
                return errorResponse(
                    res,
                    "El correo ya esta registrado",
                    409
                );
            }
            const hashedPassword = await hashPassword(password);

            await createUserDB(
                name, email, hashedPassword, idRol
            );
            return successResponse(
                res,
                null,
                "Registro exitoso",
                201
            );
        }
    } catch(error) {
        console.log(error);
        return errorResponse(
            res,
            "Error interno del servidor",
        );
    }
}

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
        const validPassword = await comparePassword(
            password,
            user.password
        );

        if (!validPassword) {
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