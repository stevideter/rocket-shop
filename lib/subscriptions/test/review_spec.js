var assert = require('assert');
var ReviewProcess = require('../processes/review');
var Helpers = require('./helpers');
var DB = require('../db');
var sinon = require('sinon');
var Mission = require('../models/mission');

describe('The Review Process', function () {
  describe('Receiving a valid application', function () {
    var decision, review, db, validApp = Helpers.validApplication;
    before(function (done) {
      db = new DB();
      sinon.stub(db, 'getMissionByLaunchDate').yields(null, new Mission());
      sinon.stub(db, "saveAssignment").yields(null, {saved: true});
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

    after(function(done) {
      db.getMissionByLaunchDate.restore();
      db.saveAssignment.restore();
      done();
    });


    it('returns success', function () {
      assert(decision.success, decision.message);
    });
    it('returns an assignment', function () {
      assert(decision.assignment);
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

    it('saves the assigment', function() {
      assert(db.saveAssignment.called, 'should save a valid assignment');
    });
  });
});
