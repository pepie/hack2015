restify = require('restify'),
_ = require('underscore'),
config = require('config'),
querystring = require('querystring');

var client = restify.createJsonClient({
    url: config.service.vip
});


exports.search = function(querystring, callback) {
    var path = '/search?' + querystring;
    
    client.get(path, function(err,req,res,data) {

        return callback(err, data);
    });

}



