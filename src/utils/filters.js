/**
 * ====================================================
 * Filtros dinámicos (Base)
 * ====================================================
 *
 * Este archivo se deja preparado para cuando el proyecto
 * tenga varios módulos (Employees, Products, Customers,
 * Vendors, etc.).
 *
 * Por ahora NO se utiliza.
 *
 * En futuras clases construiremos un Query Builder
 * reutilizable para toda la aplicación.
 */

export const buildFilters = (filters = {}) => {

    return {
        filters
    };

};