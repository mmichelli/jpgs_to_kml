var  join = require('path').join
  , dir = join(__dirname, "data")
  , photos_to_kml = require("../")
  , fs = require('fs')
  , assert = require("assert");





describe('Photos data stream a kml file', function(){

    it('should return file of points', function(done){

        var s = photos_to_kml(dir, function(err, file) {
                    done();

                   });

        s.pipe(fs.createWriteStream(join(process.cwd() ,'out.kml')));

    })
});
 