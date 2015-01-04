var config = require('config').settings;

exports.include = function(app) {

    app.get("/", require('../controllers/index'));
    app.get("/a", require('../controllers/a') );

    app.get("/proxy/:path", require('../controllers/proxy'));
    app.get("/proxy/:path/:type", require('../controllers/proxy'));

};
