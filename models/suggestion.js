/**
 * @author djqq
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var SuggestionSchema = new Schema({
	author:{type:String},
	userImg:{type:String},
	content:{type:String},
	createTime:{type:Date,default:Date.now}
})

mongoose.model("Suggestion",SuggestionSchema);
