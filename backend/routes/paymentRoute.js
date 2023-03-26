const express = require("express");
const {
    processPayment,
    sendStripeApiKey,
    sessionf,
} = require("../controllers/paymentController");
const router = express.Router();

// router
//     .route("/create-checkout-session")
//     .post(sessionf);
// router.route("/payment/process").post(processPayment);
router.route("/payment").post(sessionf);

// router.route("/stripeapikey").get(sendStripeApiKey);

module.exports = router;