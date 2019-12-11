const express = require('express');
const { validateUser, validateUserId }  = require("../middleware/validate")
const postRouter = require("../posts/postRouter")
const users = require("../data/seeds/02-users")
const userDb = require("./userDb")

const router = express.Router();

router.use("/:id/posts", postRouter)

router.get("/", (req, res) => {
  const opts = {
      limit: req.query.limit,
      sortby: req.query.sortby,
      sortdir: req.query.sortdir,
  }

  userDb.get(res.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      next(err);
    })
})

router.get("/:id", validateUserId(), (req, res) => {
  userDb.getById(req.params.id)
      .then(user => {
          if(user){
              res.status(200).json(user)
          } else {
              res.status(404).json({ message: "User not found" })
          }
      })
      .catch(err => {
          console.log(err)
          next(err)
      })
})

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.post("/", validateUser(), (req, res) => {
  userDb.insert(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(error)
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })
})

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.put("/:id", validateUser(), validateUserId(), (req, res) => {
  userDb.update(req.user.id, req.body)
  .then(user => {
      res.status(200).json(user)
  })
  .catch(err => {
      console.log(err)
      next(err)
  })
})

router.delete("/:id", validateUserId(), (req, res) => {
  userDb.remove(req.params.id)
      .then(res => {
          res.status(200).json({ message: "The user has been deleted." })
      })
      .catch(err => {
          next(err)
      })
})

module.exports = router;
