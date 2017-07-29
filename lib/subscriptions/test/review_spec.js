var assert = require('assert');
var ReviewProcess = require('../processes/review');
var MembershipApplication = require('../models/membership_application');
var sinon = require('sinon');

describe('The Review Process', function () {
  describe('Receiving a valid application', function () {
    var decision;
    var review = new ReviewProcess();
    var receivedSpy = sinon.spy();
    var validatedSpy = sinon.spy();
    var missionSelectedSpy = sinon.spy();
    var roleAvailableSpy = sinon.spy();
    var roleCompatibleSpy = sinon.spy();
    var validApp = new MembershipApplication(
      {
        first: 'Test',
        last: 'User',
        email: 'test@test.com',
        age: 30,
        height: 65,
        weight: 150
      });
    before(function (done) {
      review.on("application-received", receivedSpy);
      review.on("validated", validatedSpy);
      review.on("mission-selected", missionSelectedSpy);
      review.on("role-available", roleAvailableSpy);
      review.on("role-compatible", roleCompatibleSpy);
      review.processApplication(validApp, function (err, result) {
        if (err) {
          console.log(err);
        }
        decision = result;
        done();
      });
    });


    it('returns success', function () {
      assert(decision.success, decision.message);
    });
    it('emits received event', function() {
      assert(receivedSpy.called);
    });
    it('emits validated event', function() {
      assert(validatedSpy.called);
    });
    it('emits mission selected event', function() {
      assert(missionSelectedSpy.called);
    });
    it('emits role available event', function() {
      assert(roleAvailableSpy.called);
    });
    it('emits role compatible event', function() {
      assert(roleCompatibleSpy.called);
    });
  });

  describe('Receiving an invalid application', function () {
    var decision;
    before(function (done) {
      var invalidApp = new MembershipApplication();
      var review = new ReviewProcess();
      review.processApplication(invalidApp, function (err, result) {
        if (err) {
          console.log(err);
        }
        decision = result;
        done();
      });
    });


    it('denies application', function () {
      assert(!decision.success, decision.message);
    });
  });
});
