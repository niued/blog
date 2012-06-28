/**
 * @author djqq
 */
var suggestion = require('./controller/suggestion.js');
var replay = require('./controller/replay.js');
var static = require('./controller/static.js');
var user = require('./controller/user.js');
var article = require('./controller/article.js');
var tag = require('./controller/tag.js');
var upload = require('./controller/upload.js');
exports = module.exports = function(app){
	//app.get('/suggestion/:page',suggestion.getList);
	//app.post('/suggestion/addsug',suggestion.addSug);
	//app.post('/suggestion/addsugmore',suggestion.addSugMore);
	//app.post('/replay/addrep',replay.addRep);
	//app.get('/blog',static.index);
	//app.get('/version',static.version);
	
	//app.get('/admin',suggestion.admin);
	app.post('/admin/sign',user.signin);
	app.get('/admin/sign',user.signin);
	
	
	
	//后台
	app.get('/admin',user.login);
	app.get('/admin/login',user.login);
	app.post('/admin/login',user.login);

	app.get('/admin/article_?:num?',article.adminArticleIndex);
	app.get('/admin/article/edit(:aid)?',article.optArticle);
	app.post('/admin/article/edit',article.ArticleEdit);
	//tag
	app.post('/admin/addtag.json',tag.addTag);
	app.post('/admin/deltag.json',tag.delTag);
	
	//上传
	app.post('/admin/upload',upload.image);
	
	//前台
	app.get('/',article.index);
	app.get('/post',article.index);
	app.get('/blog_?:num?',article.index);
	app.get('/post:aid',article.postDetail);
	app.get('/about',article.about);
	
	
	app.get('*',function(req,res){
		res.json({res:"404"});
	})
}

