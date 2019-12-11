const userDb = require("../users/userDb")
const postDb = require("../posts/postDb")

function validateUserId(req, res, next) {
    return (req, res, next) => {
        userDb.getById(req.params.id)
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
                res.status(500).json({ message: "Internal Server Error" })
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

  function validatePostId(req, res, next) {
    // do your magic!
  }
  
  function validatePost(req, res, next) {
    return (req, res, next) => {
        if(!req.body) {
            return res.status(400).json({ message: "Missing post data"})
        }
        if(!req.body.text) {
            return res.status(400).json({ message: "Missing required text field" })
        }
        next();
    }
  }

module.exports = {
    validateUserId,
    validateUser,
    validatePost
}