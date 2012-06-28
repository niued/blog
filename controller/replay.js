/**
 * @author djqq
 */
var models = require('../models');
var Suggestion = models.Suggestion;
var Replay = models.Replay;
var config = require('../config').config;

exports.addRep = function(req,res,next){
	var replay = new Replay();
	console.log(req.body.sugId);
	replay.sug_id = req.body.sugId;
	replay.content = req.body.content;
	replay.save(function(err){
		if(err){
			res.json({res:-1});
		}
		res.json({res:1});
	});
}

function getReplaysbySugId(sugId,cb){
	Replay.find({sug_id:sugId},function(err,replays){
		if(err){
			return cb(err);
		}else{
			return cb(null,replays);
		}
	})
	
}

exports.get_replays_by_sugid = getReplaysbySugId;