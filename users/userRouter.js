const express = require('express');
const users = require("../data/seeds/02-users")
const { validateUser, validateUserId }  = require("../middleware/validate")
const router = express.Router();

router.post("/", (req, res) => {
  users.add(req.body)
      .then(user => {
          res.status(201).json(user)
      })
      .catch(err => {
          console.log(err)
          next(err)
      })
})

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  const opts = {
      limit: req.query.limit,
      sortby: req.query.sortby,
      sortdir: req.query.sortdir,
  }

  try {
      users.find(opts)
  } catch(err) {
      next(err)
  }
})

router.get("/:id", validateUserId(), (req, res) => {
  users.getById(req.params.id)
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

router.get('/:id/posts', validateUserId(), (req, res) => {
  // do your magic!
});

router.delete("/:id", validateUserId(), (req, res) => {
  users.remove(req.params.id)
      .then(count => {
          res.status(200).json({ message: "The user has been deleted." })
      })
      .catch(err => {
          next(err)
      })
})

router.put(":/id", validateUserId(), (req, res) => {
  users.update(req.params.id, req.body)
  .then(user => {
      res.status(200).json(user)
  })
  .catch(err => {
      console.log(err)
      next(err)
  })
})

module.exports = router;
