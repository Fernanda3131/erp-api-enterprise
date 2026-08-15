import {
    getEmployeesDB,
    getEmployeeByIdDB,
    createEmployeeDB,
    updateEmployeeDB,
    deleteEmployeeDB
} from "../models/employee.model.js";

import { getPagination } from "../utils/pagination.js";

import {
    successResponse,
    errorResponse
} from "../utils/responses.js";


export const getEmployeesCont = async (req, res) => {

    try {

        const {
            page,
            limit,
            offset
        } = getPagination(req.query);


        const {
            employees,
            total
        } = await getEmployeesDB(
            offset,
            limit
        );


        const totalPages = Math.ceil(
            total / limit
        );


        return successResponse(
            res,
            employees,
            "Empleados obtenidos correctamente.",
            200,
            {
                page,
                limit,
                total,
                totalPages
            }
        );

    } catch (error) {

        console.error(error);

        return errorResponse(
            res,
            "Error al obtener los empleados."
        );

    }

};


export const getEmployeeByIdCont = async (req, res) => {

    try {

        const { id } = req.params;


        const employee = await getEmployeeByIdDB(id);


        if (!employee) {

            return errorResponse(
                res,
                "Empleado no encontrado.",
                404
            );

        }


        return successResponse(
            res,
            employee,
            "Empleado obtenido correctamente."
        );

    } catch (error) {

        console.error(error);

        return errorResponse(
            res,
            "Error al obtener el empleado."
        );

    }

};


export const createEmployeeCont = async (req, res) => {

    try {

        const {
            name,
            last_name,
            document,
            phone,
            address,
            position
        } = req.body;


        if (
            !name ||
            !last_name ||
            !document ||
            !phone ||
            !address ||
            !position
        ) {

            return errorResponse(
                res,
                "Todos los campos son obligatorios.",
                400
            );

        }


        const newEmployee = await createEmployeeDB(
            name,
            last_name,
            document,
            phone,
            address,
            position
        );


        if (!newEmployee) {

            return errorResponse(
                res,
                "El número de documento ya se encuentra registrado.",
                409
            );

        }


        return successResponse(
            res,
            null,
            "Empleado creado correctamente.",
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


export const updateEmployeeCont = async (req, res) => {

    try {

        const { id } = req.params;


        const {
            name,
            last_name,
            document,
            phone,
            address,
            position
        } = req.body;


        if (
            !name ||
            !last_name ||
            !document ||
            !phone ||
            !address ||
            !position
        ) {

            return errorResponse(
                res,
                "Todos los campos son obligatorios.",
                400
            );

        }


        const employee = await getEmployeeByIdDB(id);


        if (!employee) {

            return errorResponse(
                res,
                "Empleado no encontrado.",
                404
            );

        }


        const updatedEmployee = await updateEmployeeDB(
            id,
            name,
            last_name,
            document,
            phone,
            address,
            position
        );


        if (!updatedEmployee) {

            return errorResponse(
                res,
                "El número de documento ya pertenece a otro empleado.",
                409
            );

        }


        return successResponse(
            res,
            null,
            "Empleado actualizado correctamente."
        );

    } catch (error) {

        console.error(error);

        return errorResponse(
            res,
            "Error al actualizar el empleado.",
            500
        );

    }

};


export const deleteEmployeeCont = async (req, res) => {

    try {

        const { id } = req.params;


        const employee = await getEmployeeByIdDB(id);


        if (!employee) {

            return errorResponse(
                res,
                "Empleado no encontrado.",
                404
            );

        }


        await deleteEmployeeDB(id);


        return res.status(204).send();

    } catch (error) {

        console.error(error);

        return errorResponse(
            res,
            "Error al eliminar el empleado.",
            500
        );

    }

};