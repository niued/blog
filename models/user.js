/**
*author:djqq
*createTime:2012.06.01
*user model
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
	email:{type:String},
	avatar:{type:String},
	pass:{type:String},
	loginname:{type:String},
	name:{type:String}
})
mongoose.model("User",UserSchema);
