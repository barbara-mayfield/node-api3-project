const express = require("express")
const { validatePost, validatePostId } = require("../middleware/validate")
const postDb = require("./postDb")

const router = express.Router({
  mergeParams: true
})

router.get('/', validatePostId(), (req, res) => {
  postDb.getById(req.post.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(404).json({ message: 'could not find posts with this ID' })
  })
});

router.post('/:id', validatePostId(), validatePost(), (req, res) => {
  postDb.insert(req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(error => {
      next(error)
    })
})

router.put('/:id', validatePost(), validatePostId(), (req, res) => {
  postDb.update(req.post.id, req.body)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
      next(error)
    })
});

router.delete('/post/:postId', validatePostId(), (req, res) => {
  postDb.remove(req.post.id)
    .then(count => {
        res.status(200).json({ message: "The post was deleted" })
    })
    .catch(error => {
      next(error)
    })
});

module.exports = router;
