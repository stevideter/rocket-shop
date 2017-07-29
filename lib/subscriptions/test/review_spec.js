var assert = require('assert');
var ReviewProcess = require('../processes/review');
var MembershipApplication = require('../models/membership_application');

describe('The Review Process', function () {
  describe('Receiving a valid application', function () {
    var decision;
    before(function (done) {
      var validApp = new MembershipApplication(
        {
          first: 'Test',
          last: 'User',
          email: 'test@test.com',
          age: 30,
          height: 65,
          weight: 150
        }
      );
      var review = new ReviewProcess();
      review.processApplication(validApp, function(err, result) {
        if (err) {
          console.log(err);
        }
        decision = result;
        done();
      });
    });


    it('returns success', function() {
      assert(decision.success, decision.message);
    });
  });

  describe('Receiving an invalid application', function () {
    var decision;
    before(function (done) {
      var invalidApp = new MembershipApplication();
      var review = new ReviewProcess();
      review.processApplication(invalidApp, function(err, result) {
        if (err) {
          console.log(err);
        }
        decision = result;
        done();
      });
    });


    it('denies application', function() {
      assert(!decision.success, decision.message);
    });
  });  
});
