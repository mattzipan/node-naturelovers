module.exports = fn => {
    return (req, res, next) => {
        console.log("catching async error..")
        fn(req, res, next).catch(next)
    }
}