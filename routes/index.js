const router = require("express").Router();
const apiRoutes = require("./api");

// Define routes
router.use("/api", apiRoutes);

// If no API routes are hit, send 'wrong route' as the response
router.use((req, res) => {
  return res.send("Wrong Route!");
});

// Export router
module.exports = router;
