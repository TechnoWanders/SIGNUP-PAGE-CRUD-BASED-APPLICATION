const mongoose = require('mongoose');

const schema = mongoose.Schema(
	{
		username:{
			type: String,
			required: true,
		},

		password:{
			type: String,
			required: true,
		}
	},{ timestamps:true }
);

const Scheme = mongoose.model("model", schema);
module.exports = Scheme;
