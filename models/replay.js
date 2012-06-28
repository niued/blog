/**
 * @author djqq
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ReplaySchema = new Schema({
	author:{type:String},
	sug_id:{type:ObjectId},
	content:{type:String},
	createTime:{type:Date,default:Date.now}
})

mongoose.model("Replay",ReplaySchema);