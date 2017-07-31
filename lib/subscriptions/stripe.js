var Billing = require('./processes/billing');
var billing = new Billing({stripeKey: 'sk_test_TceHVxNU4tYUH79u6li8ivB4'});

billing.createSubscription({
    email: 'test2@test.com',
    name: 'Testing User',
    card: {
        name: 'Test User Two',
        number: '4111111111111111',
        exp_month: 11,
        exp_year: 2020
    },
    plan: "commander" // obtained with Stripe.js
}, function (err, customer) {
    // asynchronously called
    console.log(err);
    console.log(customer);
});
