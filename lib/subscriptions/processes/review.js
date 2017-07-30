var async = require('async');
var assert = require('assert');
var MissionControl = require('../models/mission_control');
var Assignment = require('../models/assignment');
var ReviewProcess = function (args) {
  assert(args.application, "Need an application to review");
  assert(args.db, 'Need a database instance');
  var app = args.application;
  var db = args.db;
  var missionControl = new MissionControl({ db: db });
  var assignment, mission;
  this.ensureAppValid = function (next) {
    if (app.isValid()) {
      next(null, true);
    } else {
      next(app.validationMessage(), null);
    }
  };

  this.findNextMission = function (next) {
    mission = missionControl.currentMission(function(err, foundMission) {
      mission = foundMission;
      next(null, mission);
    });
  }

  this.roleIsAvailable = function (next) {
    //TODO: how to select
    next(null, true);
  }

  this.ensureRoleCompatible = function (next) {
    assignment = new Assignment({
      passenger: app,
      role: app.role,
      mission: mission
    });
    next(null, assignment.passengerIsCompatible);
  }

  this.approveApplication = function (next) {
    db.saveAssignment({ assignment: assignment }, next);
  };

  this.processApplication = function (next) {
    async.series({
      validated: this.ensureAppValid,
      mission: this.findNextMission,
      roleAvailable: this.roleIsAvailable,
      roleCompatible: this.ensureRoleCompatible,
      assignment: this.approveApplication
    }, function (err, result) {
      if (err) {
        next(null, {
          success: false,
          message: err
        });
      } else {
        result.success = true;
        result.message = 'Welcome to Mars!';
        next(null, result);
      }
    });
  }

};

module.exports = ReviewProcess;
