const userDb = require("../users/userDb")

function validateUserId(req, res, next) {
    return (req, res, next) => {
        userDb.findById(req.params.id)
            .then(user => {
                if (user) {
                    req.user = user
                    next()
                } else {
                    res.status(400).json({ message: "Invalid user ID" })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: "Could not retrieve user" })
            })
    }
  }
  
  function validateUser(req, res, next) {
    return (req, res, next) => {
        if(!req.body){
            return res.status(400).json({ message: "Missing user data" })
        } 
        if (!req.body.name) {
            return res.status(400).json({ message: "Missing required name field" })
        }
        next();
    }
  }
  
  function validatePost(req, res, next) {
    return (req, res, next) => {
        if(!req.body) {
            return res.status(400).json({ message: "Missing post data"})
        }
        if(!req.body.text) {
            return res.status(400).json({ message: "Missing required text field" })
        }
    }
  }

module.exports = {
    validateUserId,
    validateUser,
    validatePost
}