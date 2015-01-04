var config = require('config');

module.exports = function(req, res){
   res.render("a", {
      title:"Asset Page",
      error_message: req.query.error_message,
      msg: "This service does not provide a user interface"
    });
};