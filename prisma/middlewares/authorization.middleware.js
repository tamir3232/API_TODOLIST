
const jwt = require('jsonwebtoken')

const Authorization = (req, res, next) => {
    try {
        const { authorization } = req.headers
        console.log(authorization)
        const token = authorization.split(" ")[1] // mempecah menjadi array 
        const decode = jwt.verify(token, "tamir")
        req.id = decode.id
        next()

    } catch (error) {
        next(error)
    }
}


module.exports = {
    Authorization
}