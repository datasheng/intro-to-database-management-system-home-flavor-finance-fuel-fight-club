exports.notFound = (req, res, next) => {
    console.log("Not Found Middleware hit for", req.originalUrl);
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404).json({ message: error.message, stack: error.stack });
};

exports.errorHandler = (err, req, res, next) => {
    console.log("Error Handler Middleware hit");
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
};