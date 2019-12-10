const userDb = require("../users/userDb")

function validateUserId(req, res, next) {
    return (req, res, next) => {
        userDb.findById(req.params.id)
            .then(user => {
                if (user) {
                    req.user = user
                    next()
                } else {
                    res.status(404).json({ message: "User not found" })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: "Invalid user ID" })
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
    // do your magic!
  }

module.exports = {
    validateUserId,
    validateUser,
    validatePost
}