export const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} `);
    console.log(`Fecha: ${new Date().toLocaleString()}`);

    next();
};