const express = require("express");
const router = express.Router();

const { auth, auth2 } = require("../middleware/auth");
const {
  createAgencyAndClient,
  updateClient,
  getTopClient,
} = require("../controllers/client.controller");

//---Create Agency And Client ---//
//   router.post('/createAgencyAndClient',auth, createAgencyAndClient)
router.post("/createAgencyAndClient", auth2, createAgencyAndClient);
router.put("/updateClient/:id", updateClient);
router.get("/getTopClient/:id", getTopClient);

module.exports = router;
