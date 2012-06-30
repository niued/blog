/**
 * @author djqq
 */

var models = require('../models');
var Article = models.Article;
var config = require('../config').config;

var tag_ctrl = require('./tag.js');

var fs = require('fs');

var EventProxy = require('eventproxy').EventProxy;
var common = require('../libs/common');

exports.getRss = function(req,res,next){
	var query = {isPublic:true};
	var opt = {limit:50,sort:[['createTime','desc']]};
	Article.find(query,[],opt,function(err,articles){
		if(err){
			
		}
		res.contentType("text/xml");
		res.render('blog/feed',{
			articles:articles
		});
	});
}