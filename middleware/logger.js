module.exports = (type) => (req, res, next) => {
    console.log(`${req.ip} - ${req.protocol} - ${req.url} - ${req.method} - ${req.get("User-Agent")}
    `)
    next();
}