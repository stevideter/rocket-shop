var moment = require('moment');
var assert = require('assert');
var Mission = require('./mission');

var MissionControl = function(args) {
  assert(args.db, 'Need a db instance');
  this.db = args.db;
};

MissionControl.prototype.currentMission = function(next) {
  var nextMission = moment().add(1, 'month').startOf('month');
  var formattedMissionDate = nextMission.format('MM-DD-YYYY');
  var self = this;
  self.db.getMissionByLaunchDate(formattedMissionDate, function(err, foundMission) {
    assert.ok(err === null, err);
    if(foundMission) {
      next(null, new Mission(foundMission));
    } else {
      foundMission = new Mission();
      self.db.createNextMission(foundMission, function(err, result) {
        next(err, foundMission);
      });
    }
  });
};

module.exports = MissionControl;
