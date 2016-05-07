function init(dbUrl){	
	var mongoose = require('mongoose');
	var bcrypt   = require('bcrypt-nodejs');
	
	var self = {};
	var db = mongoose.connect(dbUrl)

	var Schema = mongoose.Schema;
	
	/*models here*/	

	var UserSchema = new Schema({
		local            : {
	        email        : String,
	        password     : String,
	    },
	    facebook         : {
	        id           : String,
	        token        : String,
	        email        : String,
	        displayName: String,
	        name: String
	    },
	    twitter          : {
	        id           : String,
	        token        : String,
	        displayName  : String,
	        username     : String
	    },
	    google           : {
	        id           : String,
	        token        : String,
	        email        : String,
	        name         : String
	    },
	    info: String
	});

	UserSchema.methods.generateHash = function(password) {
	    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};

	// checking if password is valid
	UserSchema.methods.validPassword = function(password) {
	    return bcrypt.compareSync(password, this.local.password);
	};

	self.User = mongoose.model('User', UserSchema);

	var TripSchema = new Schema({
		user_id: String,
		name: { type: String, index: true },
		description: { type: String, index: true },
		content: { type: String, index: true },
		is_published: Boolean
	});
	self.Trip = mongoose.model('Trip', TripSchema);

	return self;
};
module.exports = init;
