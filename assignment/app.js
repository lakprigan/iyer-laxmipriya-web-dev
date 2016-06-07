/**
 * Created by PriyaArun on 5/31/16.
 */
module.exports= function (app){
    
    var models = require("./models/models.server.js");
     
    require("./services/user.service.server.js")(app, models);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
};
