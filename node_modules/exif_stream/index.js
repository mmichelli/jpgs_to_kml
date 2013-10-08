var join = require('path').join;
var walk = require('walk');
var through = require('through');
var fs = require('fs');
var ExifImage = require('exif').ExifImage;






module.exports = photos_to_data;

function photos_to_data(path) {
    var s = new through()

    fs.stat(path, function (err, stats) {
        if (err) throw err;
        if(stats.isDirectory()) {
            var walker  = walk.walk(path, { followLinks: false });
            walker.on('file', function(root, stat, next) {
                // Add this file to the list of filesets-init

                if(stat.name.match(/\.jp*g/i)) {
                    var path = join(root, stat.name);
                    streamPhoto(path,s, next ) ;
                }else{
                    next();
                }
            });
            walker.on('end', function() {
                s.queue(null)
            });
        }
        else{
            streamPhoto(path,s) ;
        }
    });
    return s;
};


function streamPhoto (path, s, cb) {
    cb = cb || function() {
                   s.queue(null);
               }
    new ExifImage(
        { image :  path},
        function (error, exifData) {
            if (error){
                cb(error);
            }
            else{
                s.queue({filePath:path, data:  exifData});
                cb(null);
            }
        });
}
