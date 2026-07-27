import {
    getEmployeesDB,
    getEmployeeByIdDB,
    createEmployeeDB,
    updateEmployeeDB,
    deleteEmployeeDB
} from "../models/employee.model.js";
export const getEmployeesCont = async (req, res) => {
    try {

        const employees = await getEmployeesDB();

        return res.status(200).json(employees);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Error al obtener los empleados"
        });

    }
};
export const getEmployeeByIdCont = async (req, res) => {

    try {

        const { id } = req.params;

        const employee = await getEmployeeByIdDB(id);

        if (!employee) {
            return res.status(404).json({
                message: "Empleado no encontrado"
            });
        }

        return res.status(200).json(employee);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Error al obtener el empleado"
        });

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

        await createEmployeeDB(
            name,
            last_name,
            document,
            phone,
            address,
            position
        );

        return res.status(201).json({
            message: "Empleado creado correctamente"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Error al crear el empleado"
        });

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

        await updateEmployeeDB(
            id,
            name,
            last_name,
            document,
            phone,
            address,
            position
        );

        return res.status(200).json({
            message: "Empleado actualizado correctamente"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Error al actualizar el empleado"
        });

    }

};
export const deleteEmployeeCont = async (req, res) => {

    try {

        const { id } = req.params;

        await deleteEmployeeDB(id);

        return res.status(204).send();

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Error al eliminar el empleado"
        });

    }

};