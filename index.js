var  path = require('path')
  , top = path.join(__dirname,"templates", "top.kml")
  , bottom = path.join(__dirname,"templates", "bottom.kml")
  , points = path.join(__dirname,"templates", "point.kml")
  , photoData = require('exif_stream')
  , fs = require('fs')
  , Handlebars = require('handlebars')
  , through = require('through');



module.exports = jpgs_to_kml;

function jpgs_to_kml(p, cb) {
    var s = new through();

    var stream = new photoData(p);
    var topTemplate = Handlebars.compile(fs.readFileSync(top, 'utf8').toString());
    var bottomTemplate = Handlebars.compile(fs.readFileSync(bottom, 'utf8').toString());
    var pointsTemplate = Handlebars.compile(fs.readFileSync(points, 'utf8').toString());


    process.nextTick(function() {
       s.queue(topTemplate({  }))
    })

    stream.on("data", function(data) {
        s.queue(pointsTemplate(data));
    });


    stream.on("end", function() {
        s.queue(bottomTemplate({}));
        s.queue(null);
        cb();
    });

    return s;
}


Handlebars.registerHelper('GPStoDecimal', GPStoDecimal);
Handlebars.registerHelper('relativePath', relativePath);


function GPStoDecimal(time, hemi){

    var d = time[0] + time[1]/60 + time[2]/3600;
    return (hemi=='S' || hemi=='W') ? d*=-1 : d;
}

function relativePath( p){
    return  path.relative(__dirname ,p);
}
