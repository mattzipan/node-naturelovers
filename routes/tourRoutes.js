const express = require("express");
const tourController = require("../controllers/tourController");
//shorter syntax for routes
const router = express.Router();

//middleware for tour routes to get the :id value
// router.param("id", tourController.checkId);

// alias route for top5 tours
router
  .route("/top5-tours")
  .get(tourController.top5Tours, tourController.getAllTours);

//aggregated tour stats
router.route("/tour-stats").get(tourController.getTourStats);

//monthly plan
router.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);

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
