const express = require('express');

const router = express.Router();

const {
    getallusers,
    getallproviders,
    approveprovider,
} = require("../controllers/admincontroller");
const {protect,adminonly}= require("../middleware/authmiddleware");

router.get("/users", protect, adminonly, getallusers);
router.get("/providers",protect, adminonly,getallproviders);
router.put("/providers/:id/status", protect, adminonly, approveprovider);


module.exports = router;