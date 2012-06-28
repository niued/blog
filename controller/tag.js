/**
 * @author djqq
 */

var models = require('../models');
var Tag = models.Tag;
var config = require('../config').config;

var EventProxy = require('eventproxy').EventProxy;
var common = require('../libs/common');

exports.addTag = function(req,res,next){
	
	var tag = new Tag();
	tag.name = req.body.name;
	tag.desc = req.body.desc;
	Tag.create(tag,function(err,doc){
		if(err){
			res.json({res:-1});
			return;
		}
		res.json({res:1,tag:doc});
		return;
	})
}
exports.delTag = function(req,res,next){
	var tid = req.body.tid;
	if(tid.length==24){
		Tag.remove({_id:tid},function(err){
			if(err){
				res.json({res:-1});
				return;
			}
			else{
				res.json({res:1});
				return;
			}
		})
	}else{
		res.send({res:-1});
		return;
	}
}

function getone_by_query(query,cb){
	Tag.findOne(query,function(err,tag){
		if(err){
			cb(err);
		}else{
			cb(null,tag);
		}
	})
}

function get_by_query(query,cb){
	Tag.find(query,[],{},function(err,tags){
		if(err){
			cb(err);
		}else{
			cb(null,tags);
		}
	})
}

exports.getone_by_query = getone_by_query;
exports.get_by_query=get_by_query;