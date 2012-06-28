var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TagSchema = new Schema({
	name:{type:String},
	desc:{type:String},
	createTime: {type: Date, default: Date.now}
})

mongoose.model("Tag",TagSchema);

