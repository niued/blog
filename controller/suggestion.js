/**
 * @author djqq
 */
var models = require('../models');
var Suggestion = models.Suggestion;
var config = require('../config').config;
var reqlay_ctrl = require('./replay');
var Encoder = require('node-html-encoder').Encoder;
var Markdown = require('node-markdown').Markdown;

var EventProxy = require('eventproxy').EventProxy;

exports.index = function(req,res,next){
	var pageNum = req.params.page;
	var limit = config.limit;
	var opt = {skip:(pageNum-1)*limit,limit:limit,sort:[['createTime','desc']]};
	Suggestion.find({},[],opt,function(err,sugs){
	})
	
}

exports.admin = function(req,res,next){
	if(req.session && req.session.user){
		console.log(req.session.user._id);
		res.render("admin/index",{user:req.session.user});
	}else{
		res.redirect("/admin/login");
	}
}


exports.getList = function(req,res,next){
	var pageNum = Number(req.params.page);
	var limit = config.limit;
	var opt = {skip:(pageNum-1)*limit,limit:limit,sort:[['createTime','desc']]};
	Suggestion.find({},[],opt,function(err,sugs){
		if(err){
			next(err);
		}
		var proxy = new EventProxy();
		
		var render = function(sugs,count){
			res.render('suggestion',{
				sugs:sugs,
				totalCount:Number(count),
				currentPage:pageNum
			});
		}
		proxy.assign("getReplays","getCount",render);
		
		get_count_by_query({},function(err,count){
			if(err){
				
			}
			proxy.trigger("getCount",count)
			
		})
		
		var done = function(){
			proxy.trigger("getReplays",sugs)
		}
		
		proxy.after('getReplay',sugs.length,done);
		for(var i=0; i<sugs.length; i++){
			(function(i){
				reqlay_ctrl.get_replays_by_sugid(sugs[i]._id,function(err,replays){
					sugs[i].replays = replays;
					proxy.trigger("getReplay");
				})
			})(i);
		}

	})
}
function get_count_by_query(query,cb){
	Suggestion.count(query,function(err,count){
		if(err){
			return cb(err);
		}
		return cb(err,Math.round(count/config.limit));
	})
}
exports.addSug = function(req,res,next){
	
	var suggest = new Suggestion();
	suggest.content = req.body.content;
	suggest.save(function(err){
		res.redirect('/suggestion/1');	
	})
}

exports.addSugMore = function(req,res,next){
	var suggest = new Suggestion();
	suggest.content = req.body.content;
	suggest.save(function(err){
		res.redirect('/admin/1');	
	})
}