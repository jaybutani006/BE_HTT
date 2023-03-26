const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// exports.processPayment = catchAsyncErrors(async(req, res, next) => {
//     const myPayment = await stripe.paymentIntents.create({
//         amount: req.body.amount,
//         currency: "inr",
//         metadata: {
//             company: "SAS",
//         },
//     });

//     res
//         .status(200)
//         .json({ success: true, client_secret: myPayment.client_secret });
// });

const YOUR_DOMAIN = "http://localhost:3000";
exports.sessionf = catchAsyncErrors(async(req, res) => {
    const { cur, amount } = req.body;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
            price_data: {
                currency: cur,
                product_data: {
                    name: "SAS",
                },
                unit_amount: amount,
            },
        }, ],
        mode: "payment",
        success_url: `${YOUR_DOMAIN}/success.html`,
        cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    res.json({ id: session.id });
});

exports.sendStripeApiKey = catchAsyncErrors(async(req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});