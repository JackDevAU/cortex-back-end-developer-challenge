export const logErrorsDev = (err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
            error: err,
        },
    });
    next(err);
};

export const logErrosProduction = (err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: 'Something went wrong..',
            error: {},
        },
    });
    next(err);
};
