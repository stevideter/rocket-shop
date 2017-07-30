var moment = require('moment');
var MissionControl = require('../models/mission_control');
var assert = require('assert');
var sinon = require('sinon');
var db = require('../db')
sinon.stub(db, 'find').yields(null, {id: 1});
var missionControl = new MissionControl({db: db});

describe('Mission Control', function() {
  describe('The Current Mission', function() {
    var currentMission;
    before(function(done) {
      missionControl.currentMission(function(err, res) {
        currentMission = res;
        done();
      });
    });
    it('is created if none exist', function() {
      assert(currentMission);
    });
  });
});
