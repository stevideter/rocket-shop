var assert = require('assert');
var ReviewProcess = require('../processes/review');
var Helpers = require('./helpers');
var DB = require('../db');
var Mission = require('../models/mission');
var Billing = require('../processes/billing');
var nock = require('nock');
var _ = require('underscore')._;

describe('The Review Process', function () {

  var db = new DB();
  before(function(done) {
    db.clearStores(done);
  });
  var billing = new Billing({ stripeKey: 'xxx' });

  describe('Receiving a valid application', function () {
    var decision, review, validApp = Helpers.validApplication;

    before(function (done) {
      var goodCall = nock('https://api.stripe.com/v1')
        .post('/customers')
        .reply(402, Helpers.goodStripeResponse);
      review = new ReviewProcess({
        application: validApp,
        db: db,
        billing: billing
      });

      review.processApplication(function (err, result) {
        decision = result;
        done();
      });
    });

    it('returns success', function () {
      assert(decision.success, decision.message);
    });
    it('returns an assignment', function () {
      assert(decision.assignment);
    });
    it('returns a subscription', function () {
      assert(decision.subscription, 'should return a subscription');
    });
  });
  describe('Receiving an application with a declined cc', function () {
    var decision, review, badBillingApp = _.clone(Helpers.validApplication);
    badBillingApp.card = 2;
    before(function (done) {
      var badCall = nock('https://api.stripe.com/v1')
        .post('/customers')
        .reply(403, Helpers.badStripeResponse);
      review = new ReviewProcess({
        application: badBillingApp,
        db: db,
        billing: billing
      });

      review.processApplication(function (err, result) {
        decision = result;
        done();
      });
    });

    it('returns false for success', function () {
      assert(!decision.success, decision.message);
    });
  });
});
