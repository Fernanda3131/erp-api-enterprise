export const getPagination = (query) => {
    const page = Numer(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page -1) * limit;

    return {
        page,
        limit,
        offset
    };
}