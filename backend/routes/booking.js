const express = require("express");
const router = express.Router();

// booking Controllers
const {getAllBookings, getBooking, createBooking, updateBooking, deleteBooking} = require("../controllers/bookingController");

router.get("/", getAllBookings);    
router.get("/:id", getBooking);
router.post("/", createBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);    

module.exports = router;