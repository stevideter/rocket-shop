var assert = require('assert');
var MembershipApplication = require('../models/membership_application');

var Helpers = require('./helpers');
describe('Applying for a mission', function() {
  var validApp;

  before( function() {
    validApp = Helpers.validApplication;
  });

  describe('is a valid application', function() {
    it('is valid', function() {
      assert(validApp.isValid(), "Not valid");
    });
  });

  describe('application invalid if', function(){

    it('is past the valid date', function() {
      var app = new MembershipApplication({validUntil: "2001-01-01"});
      assert(app.expired(),'past expiration date');
    });
    it('has no email', function() {
      var app = new MembershipApplication();
      assert(!app.emailIsValid(), 'should not be empty');
    });
    it('has an email less than four characters', function() {
      var app = new MembershipApplication({email: 'd@d'});
      assert(!app.emailIsValid(), 'should not be ok?');
    });
    it('has an email with no @', function() {
      var app = new MembershipApplication({email: 'ddddddd'});
      assert(!app.emailIsValid(), 'should not be ok?');
    });
    it('is too young', function() {
      var app = new MembershipApplication({age: 1});
      assert(!app.ageIsValid(), 'too young');
    });
    it('is too old', function() {
      var app = new MembershipApplication({age: 111});
      assert(!app.ageIsValid(), 'too old');
    });
    it('is too heavy', function() {
      var app = new MembershipApplication({weight: 1000});
      assert(!app.weightIsValid(), 'too heavy');
    });
    it('is too light', function() {
      var app = new MembershipApplication({weight: 1});
      assert(!app.weightIsValid(), 'too light');
    });
    it('is too tall', function() {
      var app = new MembershipApplication({height: 1000});
      assert(!app.heightIsValid(), 'too tall');
    });
    it('is too smol', function() {
      var app = new MembershipApplication({height: 1});
      assert(!app.weightIsValid(), 'too smol');
    });
    it('has no first', function() {
      var app = new MembershipApplication({last: 'last'});
      assert(!app.nameIsValid(), 'no first');
      
    });
    it('has no last', function() {
      var app = new MembershipApplication({first: 'first'});
      assert(!app.nameIsValid(), 'no last');
      
    });
  });
});
