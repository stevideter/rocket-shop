var assert = require('assert');
var ReviewProcess = require('../processes/review');
var MembershipApplication = require('../models/membership_application');
var sinon = require('sinon');

describe('The Review Process', function () {
  describe('Receiving a valid application', function () {
    var decision;
    var validApp = new MembershipApplication(
      {
        first: 'Test',
        last: 'User',
        email: 'test@test.com',
        age: 30,
        height: 65,
        weight: 150
      });
    var review = new ReviewProcess({ application: validApp });
    sinon.spy(review, "ensureAppValid");
    sinon.spy(review, "findNextMission");
    sinon.spy(review,'roleIsAvailable');
    sinon.spy(review, 'ensureRoleCompatible');
    before(function (done) {
      review.processApplication(function (err, result) {
        decision = result;
        done();
      });
    });


    it('returns success', function () {
      assert(decision.success, decision.message);
    });
    it('calls ensureAppValid', function () {
      assert(review.ensureAppValid.called);
    });
    it('calls findNextMission', function () {
      assert(review.findNextMission.called);
    });
    it('calls roleIsAvailable', function () {
      assert(review.roleIsAvailable.called);
    });
    it('calls ensureRoleCompatible', function () {
      assert(review.ensureRoleCompatible.called);
    });
  });
});
