const {Router} = require('express');
const mongoose = require("mongoose");
const User = require('../../models/user')
const asyncHandler = require("../async-handler");
const { update } = require('../../models/user');

const router = new Router();

// POST /api/users
router.post('/', asyncHandler(async (req, res) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        login: req.body.login,
        password: req.body.login,
        password: req.body.password
    }) 
    user.save();
    res.json(user);
}))

// PATCH /api/users/:id
router.patch('/:user_id', asyncHandler(async (req, res) => {
    const id = req.params.user_id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
}))

// GET /api/users/:id
router.get('/:productId', asyncHandler(async (req, res) => {
    const id = req.params.productId;
    User.findById(id)
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json(doc);
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
}))


module.exports = router