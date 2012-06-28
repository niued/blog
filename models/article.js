/**
 * @author djqq
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ArticleSchema = new Schema({
	author:{type:String},
	title:{type:String},
	keyWord:{type:String},
	content:{type:String},
	viewImage:{type:String},
	createTime:{type:Date,default:Date.now},
	updateTime:{type:Date,default:Date.now},
	isPublic:{type:Boolean,default:false},
	visitCount:{type:Number,default:0},
	replyCount:{type:Number,default:0},
	tags:{type:Array,default:[]},
	field:{type:String}
})

mongoose.model("Article",ArticleSchema);
