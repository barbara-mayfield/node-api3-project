const express = require('express');
const { validateUser, validatePost, validateUserId }  = require("../middleware/validate")
const postRouter = require("../posts/postRouter")
const userDb = require("./userDb")
const postDb = require("../posts/postDb")

const router = express.Router();

router.use("/:id/posts", postRouter)

router.get("/", (req, res) => {
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

router.get('/posts/:id', validateUserId(), (req, res) => {
  userDb.getUserPosts(req.user.id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      next(err)
    })
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

router.post('/:id/posts', validateUserId(), validatePost(), (req, res) => {
  const newPost = {
    user_id: req.params.id,
    text: req.body.text
  }

  postDb.insert(newPost)
    .then(newPost => {
      res.status(200).json(newPost)
    })
    .catch(error => {
      next()
    })
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
  userDb.remove(req.user.id)
    .then(count => {
        res.status(200).json({ message: "The user was deleted" })
    })
    .catch(error => {
      next(error)
    })
})

module.exports = router;
