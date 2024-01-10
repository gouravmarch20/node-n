const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,handleAllAnalytics
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);
router.get("/analytics/detail/all", handleAllAnalytics);

module.exports = router;
