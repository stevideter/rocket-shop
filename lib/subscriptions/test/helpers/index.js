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

exports.goodStripeResponse = function(args) {
  args = args || (args= {});
  var plan = args.plan || 'commander';
  return { id: 'cus_B7dRni0zVcVvDR',
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
   { object: 'list',
     data: [ [Object] ],
     has_more: false,
     total_count: 1,
     url: '/v1/customers/cus_B7dRni0zVcVvDR/sources' },
  subscriptions:
   { object: 'list',
     data: [ [Object] ],
     has_more: false,
     total_count: 1,
     url: '/v1/customers/cus_B7dRni0zVcVvDR/subscriptions' } };
}();
