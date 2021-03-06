var vows = require('./setup')
  , assert = require('assert')
  , baker = require('../lib/baker')
  , path = require('path')

var PNGFILE = path.join(__dirname, 'no-badge-data.png');
vows.describe('bake some badges').addBatch({
  'A clean PNG': {
    'should fail if not given data': function(){
      assert.throws(function(){ baker.prepare(PNGFILE) }, Error);
    },
    'can be a prepared with badge data': function(){
      var badge = baker.prepare(PNGFILE, 'https://location-of-badge');
      var data = baker.read(badge);
      assert.equal(data, 'https://location-of-badge');
    },
  },
  'A prepared PNG': {
    topic: function(){
      return baker.prepare(PNGFILE, 'https://location-of-badge');
    },
    'should fail if another is given': function(buf){
      assert.throws(function(){ baker.prepare(buf, 'new-stuff') }, Error);
    }
  }
}).export(module);