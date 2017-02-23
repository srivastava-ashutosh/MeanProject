config = require('./configs');
mongoose = require('mongoose');
module.exports = function() {
	var db = mongoose.connect(config.db);
    require('../app/models/users.server.model');
    /*require('../app/models/training.server.model');
    require('../app/models/technologies.server.model');
    require('../app/models/designation.server.model');
    require('../app/models/frontendresource.server.model');
    require('../app/models/projecttype.server.model');
    require('../app/models/kra.server.model');
    require('../app/models/nontech.server.model');
    require('../app/models/pro_tech_maping.model');
    require('../app/models/performance.model');*/
    return db;
};