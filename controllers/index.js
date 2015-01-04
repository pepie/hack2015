var config = require('config').settings;

module.exports = function(req, res){
   res.render("index", {
      title:"Index page",
      error_message: req.query.error_message,
      msg: "This service does not provide a user interface"
    });
};