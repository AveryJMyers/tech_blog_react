const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const blogRoutes = require('./blogRoutes.js');
const commentRoutes = require('./commentRoutes.js');

router.use('/comment', commentRoutes);
router.use('/blog', blogRoutes)
router.use('/user', userRoutes);

module.exports = router;