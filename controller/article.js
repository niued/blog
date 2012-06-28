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

//后台文章列表
exports.adminArticleIndex = function(req,res,next){
	
	if(!common.isLogin(req,res,next)){
		res.redirect("/admin/login");
		return;
	}

	var pageNum = req.params.num;

	if(!pageNum){
		pageNum =1;
	}
	var limit = config.limit;
	var opt = {skip:(pageNum-1)*limit,limit:limit,sort:[['createTime','desc']]};
	
	var proxy = new EventProxy();
	var render = function(articles,count){

	
		if(pageNum>Math.ceil(count/limit)){
			pageNum = Math.ceil(count/limit);
		}

		res.render('admin/index',{
			articles:articles,
			totalCount:Number(count),
			currentPage:pageNum
		});
	}
	proxy.assign("getArticles","getCount",render);
	
	Article.find({},[],opt,function(err,articles){
		if(err){
			
		}
		proxy.trigger("getArticles",articles);

	});
	
	get_count_by_query({},function(err,count){
		if(err){
			
		}
		proxy.trigger("getCount",count)
	})
	
}

//后台文章编辑
exports.optArticle = function(req,res,next){
	if(!common.isLogin(req,res,next)){
		res.redirect("/admin/login");
		return;
	}
	
	var aid=req.params.aid;
	
	var proxy = new EventProxy();
	
	var render = function(art,tags){
		if(art&&art.tags){
			for(var i=0;i<art.tags.length;i++){
				for(var j=0;j<tags.length;j++){
					if(tags[j]._id==art.tags[i]){
						tags[j].checked = true;
					}
				}
			}
		}
		
		res.render('admin/articleEdit',{
			article:art,
			tags:tags
		})
	}	

		
	proxy.assign("getArt","getTags",render);
	
	
	tag_ctrl.get_by_query({},function(err,tags){
		if(err){
		}
		proxy.trigger("getTags",tags)
	})

	
	if(aid&&aid.length==24){
		get_by_one({_id:aid},function(err,art){
			if(err){
				next(err);
			}
			proxy.trigger("getArt",art);
		})
	}else{
		var art = null;
		proxy.trigger("getArt",art);
	}
	
	
	
}

//后台文章编辑保存
exports.ArticleEdit = function(req,res,next){
	if(!common.isLogin(req,res,next)){
		res.redirect("/admin/login");
		return;
	}
	
	var createTime = new Date(req.body.createtime);
	
	var aid = req.body.aid;
	if(aid&&aid.length==24){
		get_by_one({_id:aid},function(err,art){
			if(err){
				next(err);
			}
			if(art){
				art.title = req.body.title;
				art.keyWord = req.body.keyword;
				art.content = req.body.content;
				art.updateTime = new Date();
				art.tags = req.body.tag;
				art.field = req.body.field;
				art.viewImage = req.body.viewimg;
				art.isPublic = req.body.public=="0"?true:false;
				if(common.isValidDate(createTime)){
					art.createTime = createTime;
				}
				art.save(function(err){
					res.redirect("/admin/article");
				})
			}else{
				
			}
		})
	}else{
		var art = new Article();
		art.title = req.body.title;
		art.keyWord = req.body.keyword;
		art.content = req.body.content;
		art.name = req.session.user.name;
		art.tags = req.body.tag;
		art.field = req.body.field;
		art.viewImage = req.body.viewimg;
		art.isPublic = req.body.public=="0"?true:false;
		if(common.isValidDate(createTime)){
			art.createTime = createTime;
		}
		art.save(function(err){
			res.redirect("/admin/article");
		});
	}
}


//前台获取文章列表
exports.index = function(req,res,next){
	var pageNum = req.params.num;
	var keyWord = req.params.key;
	if(!pageNum){
		pageNum =1;
	}
	var limit = config.limit;
	var query = {isPublic:true};
	var opt = {skip:(pageNum-1)*limit,limit:limit,sort:[['createTime','desc']]};
	
	var proxy = new EventProxy();
	var render = function(articles,count,imageart){
		if(pageNum>Math.ceil(count/limit)){
			pageNum = Math.ceil(count/limit);
		}

		res.render('blog/index',{
			articles:articles,
			imageart:imageart,
			totalCount:count,
			currentPage:pageNum
		});
	}
	proxy.assign("getArticles","getCount","getImageArt",render);
	
	Article.find(query,[],opt,function(err,articles){
		if(err){
			
		}
		proxy.trigger("getArticles",articles);

	});
	
	get_count_by_query(query,function(err,count){
		if(err){
			
		}
		proxy.trigger("getCount",count)
	})
	
	var image_art_query = {"viewImage":/.+/};
	Article.find(image_art_query,[],{},function(err,imageart){
		if(err){
			
		}
		proxy.trigger("getImageArt",imageart);
	})
		
}

//前台文章详细
exports.postDetail = function(req,res,next){
	var aid = req.params.aid;
	if(aid.length!==24){
		res.render("blog/post",{
			article:null,
			error:"该博文不存在！"
		});
		return;
	}

	var proxy = new EventProxy();
	
	var render = function(art){
		res.render("blog/post",{
			article:art,
			error:""
		});
		
	}
	proxy.assign("getArt","updateVisitCount",render);
	var query = {_id:aid,isPublic:true};

	get_by_one(query,function(err,art){
		if(err){
			next(err);
		}
		proxy.trigger("getArt",art);
	})
	
	Article.update({_id:aid},{$inc:{"visitCount":1}},function(){
		proxy.trigger("updateVisitCount");
	})
	
}
//关于我
exports.about = function(req,res,next){
	var proxy = new EventProxy();
	
	var render = function(art){
		res.render("blog/post",{
			article:art,
			error:""
		});
		
	}
	proxy.assign("getArt",render);
	var query = {field:"4"};

	get_by_one(query,function(err,art){
		if(err){
			next(err);
		}
		proxy.trigger("getArt",art);
	})
}


//获取文章总数
function get_count_by_query(query,cb){
	Article.count(query,function(err,count){
		if(err){
			return cb(err);
		}
		return cb(null,count);
	})
}

//获取某篇文章
function get_by_one(query,cb){
	Article.findOne(query,function(err,art){
		if(err){
			return cb(err);
		}
		return cb(null,art);
	})
}

function checkLogin(req,res,next){
	if(!common.isLogin(req,res,next)){
		res.redirect("/admin/login");
		return;
	}
}