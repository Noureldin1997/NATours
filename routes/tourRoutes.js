const express = require('express');
const fs = require('fs');
const tourController = require('../controllers/tourController');

const router = express.Router();

//middleware
router.param('id', (req, res, next, val) => {
  console.log("this tour's id is: " + val);
  if (val.id * 1 > 10) {
    return res.status(404).json({
      status: 'fail',
      message: 'not found',
    });
  }
  next();
});

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.postNewTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.patchTour)
  .delete(tourController.deleteTour);

module.exports = router;
