var assert = require('assert');
var ReviewProcess = require('../processes/review');
var Helpers = require('./helpers');
var DB = require('../db');
var sinon = require('sinon');
var Mission = require('../models/mission');
var Billing = require('../processes/billing');
var nock = require('nock');

describe('The Review Process', function () {

  describe('Receiving a valid application', function () {
    var decision, review, db, validApp = Helpers.validApplication;
    var billing = new Billing({ stripeKey: 'xxx' });

    before(function (done) {
      db = new DB();
      sinon.stub(db, 'getMissionByLaunchDate').yields(null, new Mission());
      sinon.stub(db, 'saveAssignment').yields(null, { saved: true });
      var goodCall = nock('https://api.stripe.com/v1')
        .post('/customers')
        .reply(200, Helpers.goodStripeResponse);
      review = new ReviewProcess({
        application: validApp,
        db: db,
        billing: billing
      });
      sinon.spy(review, 'ensureAppValid');
      sinon.spy(review, 'findNextMission');
      sinon.spy(review, 'roleIsAvailable');
      sinon.spy(review, 'ensureRoleCompatible');
      sinon.spy(review, 'startSubscription');

      review.processApplication(function (err, result) {
        decision = result;
        done();
      });
    });

    after(function () {
      db.getMissionByLaunchDate.restore();
      db.saveAssignment.restore();
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
    it('starts the subscription', function () {
      assert(review.startSubscription.called, 'should start the subscription');
    });
    it('returns a subscription', function () {
      assert(decision.subscription, 'should return a subscription');
    });

    it('saves the assigment', function () {
      assert(db.saveAssignment.called, 'should save a valid assignment');
    });
  });
  describe('Receiving an application with a declined cc', function () {
    var decision, review, db, validApp = Helpers.validApplication;
    var billing = new Billing({ stripeKey: 'xxx' });

    before(function (done) {
      db = new DB();
      sinon.stub(db, 'getMissionByLaunchDate').yields(null, new Mission());
      sinon.stub(db, 'saveAssignment').yields(null, { saved: true });
      var badCall = nock('https://api.stripe.com/v1')
        .post('/customers')
        .reply(200, Helpers.badStripeResponse);
      review = new ReviewProcess({
        application: validApp,
        db: db,
        billing: billing
      });
      sinon.spy(review, 'ensureAppValid');
      sinon.spy(review, 'findNextMission');
      sinon.spy(review, 'roleIsAvailable');
      sinon.spy(review, 'ensureRoleCompatible');
      sinon.spy(review, 'startSubscription');

      review.processApplication(function (err, result) {
        decision = result;
        console.log(decision);
        done();
      });
    });

    after(function () {
      db.getMissionByLaunchDate.restore();
      db.saveAssignment.restore();
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
    it('starts the subscription', function () {
      assert(review.startSubscription.called, 'should start the subscription');
    });
    it('returns a subscription', function () {
      assert(decision.subscription, 'should return a subscription');
    });

    it('saves the assigment', function () {
      assert(db.saveAssignment.called, 'should save a valid assignment');
    });
  });
});
