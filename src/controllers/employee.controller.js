
const employees = [
    {
        id: 1,
        nombre: "Fernanda",
        cargo: "Desarrolladora"
    },
    {
        id: 2,
        nombre: "Carlos",
        cargo: "Administrador"
    }
];

export const getEmployees = (req, res) => {
    return res.status(200).json(employees);
};

export const getEmployeesId = (req, res) => {
    const id = req.params.id;

    const employee = employees.find((employee) => employee.id === Number(id));

    return res.status(200).json(employee);
};

export const createEmployee = (req, res) => {
    const newEmployee = req.body;
    newEmployee.id = employees.length + 1;
    employees.push(newEmployee);
    return res.status(201).json(employee);
};

export const UpdateEmployee = (req, res) => {
    const id = Number(req.params.id);
    const employee = employees.find((employee) => employee.id === id);
    if (!employee) {
        return res.status(404).json({
            message: "Empleado no encontrado"
        });
    };
    employee.name = req.body.name;
    employee.position = req.body.position;
    
    res.status(200).json({
        message: "Informacion del empleado actualizado con exito",
        employee,

    });
};

export const deleteEmployee = (req, res) => {
    return res.status(200).json({ message: "Empleado Eliminado" });
};

export default {
    getEmployees,
    createEmployee,
    deleteEmployee,
    getEmployeesId,
    UpdateEmployee
};