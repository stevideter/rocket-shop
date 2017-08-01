var MembershipApplication = require('../../models/membership_application');

exports.validApplication = new MembershipApplication(
  {
    first: 'Test',
    last: 'User',
    email: 'test@test.com',
    age: 30,
    height: 65,
    weight: 150,
    role: 'tourist',
    card: 1
  }
);

exports.goodStripeArgs = {
  name: 'Test User',
  email: 'test@test.com',
  plan: 'tourist',
  card: 1
};

exports.badStripeArgs = {
  name: 'Test User',
  email: 'test@test.com',
  plan: 'tourist',
  card: 2
};

exports.badStripeResponse = function (args) {
  return {
    message: 'Your card was declined.',
    type: 'card_error',
    param: '',
    code: 'card_declined',
    decline_code: 'generic_decline',
    statusCode: 402,
    requestId: 'req_ufvt8o4CqDARae',
    error: 'error'
  };
}();
exports.goodStripeResponse = function (args) {
  args = args || (args = {});
  var plan = args.plan || 'commander';
  return {
    id: 'cus_B7dRni0zVcVvDR',
    object: plan,
    account_balance: 0,
    created: 1501447044,
    currency: 'usd',
    default_source: 'card_1AlOACIvzmTXqPuaRq7UpcTn',
    delinquent: false,
    description: 'Another Test User',
    discount: null,
    email: 'test1@test.com',
    livemode: false,
    metadata: {},
    shipping: null,
    sources:
    {
      object: 'list',
      data: [[Object]],
      has_more: false,
      total_count: 1,
      url: '/v1/customers/cus_B7dRni0zVcVvDR/sources'
    },
    subscriptions:
    {
      object: 'list',
      data: [[Object]],
      has_more: false,
      total_count: 1,
      url: '/v1/customers/cus_B7dRni0zVcVvDR/subscriptions'
    }
  };
}();
