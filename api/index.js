const {Router} = require('express')
const recipesRouter = require('./recipes/recipes.controller')
const usersRouter = require('./users/users.controller')
const router = new Router();

router.use('/recipes', recipesRouter);
router.use('/users', usersRouter);

module.exports = router;