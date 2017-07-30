var async = require('async');
var assert = require('assert');
var Mission = require('../models/mission');

var ReviewProcess = function(args) {
  assert(args.application, "Need an application to review");
  var app = args.application;

  this.ensureAppValid = function(next) {
    if (app.isValid()) {
      next(null, true);
    } else {
      next(app.validationMessage(), null);
    }
  };

  this.findNextMission = function(next) {
    var mission = new Mission();
    next(null, mission);
  }

  this.roleIsAvailable = function(next) {
    //TODO: how to select
    next(null, true);
  }

  this.ensureRoleCompatible = function(next) {
    next(null, true);
  }

  this.approveApplication = function(next) {
    next(null, true);
  };

  this.processApplication = function(next) {
    async.series({
      validated: this.ensureAppValid,
      mission: this.findNextMission,
      roleAvailable: this.roleIsAvailable,
      roleCompatible: this.ensureRoleCompatible,
      success: this.approveApplication
    }, function(err, result) {
      if (err) {
        next(null, {
          success: false,
          message: err
        });
      } else {
        result.message = 'Welcome to Mars!';
        next(null, result);
      }
    });
  }

};

module.exports = ReviewProcess;
