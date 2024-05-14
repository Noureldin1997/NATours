const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.postNewUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.patchUser)
  .delete(userController.deleteUser);

module.exports = router;
