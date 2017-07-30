var moment = require('moment');
var MissionControl = require('../models/mission_control');
var Mission = require('../models/mission');
var assert = require('assert');
var sinon = require('sinon');
var db = require('../db');
var missionControl = new MissionControl({db: db});

describe('Mission Control', function() {
  describe('No Current Mission', function() {
    var currentMission;
    before(function(done) {
      sinon.stub(db, 'getMissionByLaunchDate').yields(null, null);
      sinon.stub(db, 'createNextMission').yields(null, new Mission());
      missionControl.currentMission(function(err, res) {
        currentMission = res;
        done();
      });
    });

    it('is created if none exist', function() {
      assert(currentMission);
      assert(db.getMissionByLaunchDate.called);
      assert(db.createNextMission.called);
      db.getMissionByLaunchDate.restore();
      db.createNextMission.restore();
    });
  });
  describe('Existing current mission', function() {
    var currentMission;
    before(function(done) {
      sinon.stub(db, 'getMissionByLaunchDate').yields(null, {id: 1});
      missionControl.currentMission(function(err, res) {
        console.log(res);
        currentMission = res;
        done();
      });
    });

    it('is created if none exist', function() {
      assert.equal(currentMission.id, 1);
      assert(db.getMissionByLaunchDate.called);
      db.getMissionByLaunchDate.restore();
    });
  });
});
