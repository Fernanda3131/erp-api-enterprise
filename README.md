# ERP Backend

Backend de un sistema ERP desarrollado con Node.js, Express y SQL Server.

El proyecto implementa autenticación mediante JWT, manejo de roles y permisos, y una API REST para la gestión de empleados.

---

## Tecnologías

- Node.js
- Express.js
- SQL Server
- JavaScript
- JWT
- bcrypt
- mssql
- dotenv
- CORS

---

## Arquitectura

El backend está organizado por responsabilidades:

```text
backend/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── auth.controller.js
│   └── employee.controller.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── role.middleware.js
│   └── logger.middleware.js
│
├── models/
│   ├── auth.model.js
│   └── employee.model.js
│
├── routes/
│   ├── auth.routes.js
│   └── employee.routes.js
│
├── utils/
│   ├── auth.js
│   ├── pagination.js
│   └── response.js
│
├── .env
├── package.json
└── server.js