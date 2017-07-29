var assert = require('assert');
var MembershipApplication = require('../models/membership_application');

describe('Applying for a mission', function() {
  var validApp;

  before( function() {
    validApp = new MembershipApplication(
      {
        first: 'Test',
        last: 'User',
        email: 'test@test.com',
        age: 30,
        height: 65,
        weight: 150
      }
    );
  });

  describe('is a valid application', function() {
    it('is valid', function() {
      assert(validApp.isValid(), "Not valid");
    });
  });

  describe('application invalid if', function(){

    it.skip('is past the valid date');
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
