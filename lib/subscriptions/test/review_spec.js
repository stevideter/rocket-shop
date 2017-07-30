var assert = require('assert');
var ReviewProcess = require('../processes/review');
var Helpers = require('./helpers');
var DB = require('../db');
var sinon = require('sinon');

describe('The Review Process', function () {
  describe('Receiving a valid application', function () {
    var decision, review, validApp = Helpers.validApplication;
    before(function (done) {
      var db = new DB();
      review = new ReviewProcess({ application: validApp, db: db });
      sinon.spy(review, "ensureAppValid");
      sinon.spy(review, "findNextMission");
      sinon.spy(review, 'roleIsAvailable');
      sinon.spy(review, 'ensureRoleCompatible');
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
