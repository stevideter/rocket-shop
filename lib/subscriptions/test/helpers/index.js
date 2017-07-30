var MembershipApplication = require('../../models/membership_application');

exports.validApplication = new MembershipApplication(
  {
    first: 'Test',
    last: 'User',
    email: 'test@test.com',
    age: 30,
    height: 65,
    weight: 150
  }
);
