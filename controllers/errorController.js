const sendErrorProd = (err, res) => {
    // Operational trusted error: send msg to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        // log error
        console.error("ERROR", err)

        // send generic message
        res.status(500).json({
            status: "error",
            message: "Oh oh, something went wrong :("
        })
    }
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

module.exports = (err, req, res, next) => {
    // log stackTrace
    console.log(err.stack)

    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"

    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res)
    } else if (process.env.NODE_ENV === "production") {
        sendErrorProd(err, res)
    }
}