module.exports = (req, res, next) => {
    req.session.returnTo = req.originalUrl
    next()
}