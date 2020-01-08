const express = require("express");
const tourController = require("../controllers/tourController");
//shorter syntax for routes
const router = express.Router();

//middleware for tour routes to get the :id value
router.param("id", tourController.checkId);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
