import {
    findUserDB,
    registerDB,
    loginDB
} from "../models/auth.model.js";

import {
    hashPassword,
    comparePassword
} from "../utils/bcrypt.js";

import { generateToken } from "../utils/jwt.js";

import {
    errorResponse,
    successResponse
} from "../utils/responses.js";


import { getUserPermissionsDB } from "../models/permission.model.js";


export const registerCont = async (req, res) => {

    try {

        const {
            name,
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
                "Todos los campos son obligatorios.",
                400
            );
        }
        const existingUser = await findUserDB(email);

        if (existingUser) {

            return errorResponse(
                res,
                "El correo ya está registrado.",
                409
            );
        }
        const hashedPassword = await hashPassword(password);
        await registerDB(
            name,
            email,
            hashedPassword,
            idRol
        );
        return successResponse(
            res,
            null,
            "Registro exitoso.",
            201
        );

    } catch (error) {
        console.error(error);
        return errorResponse(
            res,
            "Error interno del servidor.",
            500
        );
    }
};


export const loginCont = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        if (!email || !password) {

            return errorResponse(
                res,
                "Email y contraseña son obligatorios.",
                400
            );

        }
        const user = await loginDB(email);
        if (!user) {

            return errorResponse(
                res,
                "Usuario no encontrado.",
                404
            );

        }
        const validPassword = await comparePassword(
            password,
            user.password
        );
        if (!validPassword) {

            return errorResponse(
                res,
                "Credenciales incorrectas.",
                401
            );

        }
        const token = generateToken(user);
        const permissions = await getUserPermissionsDB(
            user.idRol
        );

        return successResponse(
            res,
            {
                token,
                user: {
                    id: user.id,
                    name: user.name, 
                    email: user.email,
                    role: user.idRol,
                    permissions
                }
            },
            "Login exitoso.",
            200
        );

    } catch (error) {

        console.error(error);

        return errorResponse(
            res,
            "Error interno del servidor.",
            500
        );

    }

};


export const getMeCont = async (req, res) => {
    try {
        const permissions = await getUserPermissionsDB(
            req.user.role
        );
        return res.status(200).json({
            user: req.user,
            permissions
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error al obtener la información del usuario"
        });

    };
}