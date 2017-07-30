var Assignment = require('../models/assignment');
var assert = require('assert');
var Helpers = require('./helpers');
var Mission = require('../models/mission');
var MembershipApplication = require('../models/membership_application');

describe('Assignment', function() {
  describe('constructor', function() {
    it('throws assertion error if no passenger, role, and mission', function() {
      assert.throws(function() {new Assignment(); });
    });
    it('requires passenger role and mission', function() {
      var assignment = new Assignment({ passenger: 'passenger', role: 'role', mission: 'mission'});
      assert.ok(assignment);
      assert.ok(assignment.passenger);
      assert.ok(assignment.role);
      assert.ok(assignment.mission);
    });
  });

  describe('passenger is compatible', function() {
    describe('commander', function() {
      it('validates the commander candidate', function() {
        var validApp = Helpers.validApplication;
        var isCompatible = new Assignment({passenger: validApp, role: 'commander', mission: new Mission()});
        assert(isCompatible, true);
      });
      it('rejects the commander candidate', function() {
        var invalidApp = new MembershipApplication({age: 100, weight: 300, height: 100});
        var isCompatible = new Assignment({passenger: invalidApp, role: 'commander', mission: new Mission()});
        assert(isCompatible, false);
      });
    });
  });
});
