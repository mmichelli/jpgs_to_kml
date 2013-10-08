var  join = require('path').join
  , dir = join(__dirname, "data")
  , photoData = require("../")
  , fs = require('fs')
  , assert = require("assert");

describe('Get stream of photo data', function(){
    var stream = photoData(dir);
    var photos = [];

    stream.on("data",function(data) {
        photos.push(data);
    })
    it('Should return 6 objects',  function(done) {
        setTimeout(function() {
            assert.equal(photos.length , 6);
            assert.equal(photos[0].data.gps.GPSAltitude , 72.14);
            assert.equal(photos[0].data.exif.ExposureTime ,0.008);
            assert.equal(photos[0].data.image.Make, "SONY");
            done();
        }, 1000);
    })

    it('should return a stream', function(done){
        assert(stream);
        done();
    })
});
