/**
 * @author djqq
 */
var mongoose = require('mongoose');
require('./suggestion.js');
require('./replay.js');
require('./user.js');
require('./article.js');
require('./tag.js');
mongoose.connect('mongodb://127.0.0.1/ddytest',function(err){
	if(err){
		console.log('connect to db error: ' + err.message);
		process.exit(1);
	}
})

exports.Suggestion = mongoose.model("Suggestion");
exports.Replay = mongoose.model("Replay");
exports.User = mongoose.model("User");
exports.Article = mongoose.model("Article");
exports.Tag = mongoose.model("Tag");