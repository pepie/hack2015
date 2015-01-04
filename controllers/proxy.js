var config = require('config'),
    restify = require('restify'),
    _ = require('underscore'),
    querystring = require('querystring'),
    util = require('util');


var streamingClient = restify.createClient({
        url: config.service.vip,
        headers: {
            'Content-Type': 'application/json'
        }
    });

function stream(req, res) {
    var path = '/'+req.params.path,
        type;
    if (req.params.type) {
        type = req.params.type;
    }


    if (!_.isEmpty(req.query)) {
        path += '?' + querystring.stringify(req.query);
    }

        streamingClient.get(path + ( type ? '/' + type : ''), function(err, req) {

            if (err) {
                return res.send(400);
            }
            req.on('result', function(err, result) {
                if(err) {
                    if(err.statusCode) {
                        res.status(err.statusCode);
                    }
                    else res.status(400);
                }
                var pairs = _.pairs(result.headers);
                    _.each(pairs, function(pair) {

                        res.set(pair[0], pair[1]);
                    });
                return result.pipe(res);
            });
        });
};


module.exports = function(req, res){

    stream(req,res);
};
