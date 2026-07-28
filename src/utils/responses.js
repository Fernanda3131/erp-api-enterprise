export const successResponse = (
    res,
    data,
    message,
    status = 200,
    pagination = null
) => {

    return res.status(status).json({
        success: true,
        message,
        pagination,
        data
    });

};

export const errorResponse = (
    res,
    message,
    status = 500
) => {

    return res.status(status).json({
        success: false,
        message
    });

};