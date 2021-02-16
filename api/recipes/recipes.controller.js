const {Router} = require('express');
const asyncHandler = require("../async-handler");
//const RecipeNotFoundException = require("../../exceptions/recipe-not-found.exception");
//const UserNotFoundException = require("../../exceptions/user-not-found.exception");
const mongoose = require("mongoose");
const Recipe = require('../../models/recipe')
const router = new Router();

// POST /api/recipes
router.post('/', asyncHandler(async (req, res) => {
    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        user_id: req.body.user_id,
        recipe_name: req.body.recipe_name,
        description: req.body.description,
        prep_time: req.body.prep_time
    }) 
    recipe.save();
    res.json(recipe);
}))

// GET /api/recipes/:user_id
router.get('/:user_id', asyncHandler(async (req, res) => {
    const id = req.params.user_id;
    Recipe.findById(id).populate('user_id')
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
}))

// GET /api/recipes
router.get('/', asyncHandler(async (req, res) => {
    const recipe = await Recipe.find().populate('user_id');// .populate na podstawie schematu wyciagnie i podmieni
    res.json(recipe);                                     // dane stanowiące referencje do innych dokumentow 
}))


// PATCH /api/recipes/:recipe_id
router.patch('/:recipe_id', asyncHandler(async (req, res) => {
    const id = req.params.recipe_id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Recipe.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
}))

// DELETE /api/books/13
router.delete('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    Recipe.remove ({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}));


module.exports = router;