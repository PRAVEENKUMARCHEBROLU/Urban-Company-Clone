const express = require("express");
const router = express.Router();
const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} = require("../controllers/servicecontroller");

const { protect, adminonly } = require("../middleware/authmiddleware");

router.post("/", protect, adminonly, createService);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.put("/:id", protect, adminonly, updateService);
router.delete("/:id", protect, adminonly, deleteService);

module.exports = router;
