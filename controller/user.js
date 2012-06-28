/**
 * @author djqq
 * user ctrl
 * 2012.06.01
 */
var models = require('../models');
var User = models.User;
var config = require('../config').config;
var util = require('../libs/utils');
var crypto = require('crypto');

var check = require('validator').check,
	sanitize = require('validator').sanitize;
var common = require('../libs/common');

//登陆	
exports.login = function(req,res,next){
	var method = req.method.toLowerCase();
	if(method=="post"){
		var loginname = sanitize(req.body.loginname).trim();
		var pass = sanitize(req.body.pass).trim();
		
		User.findOne({loginname:loginname},function(err,user){
			if(err){
				return next(err);
			}
			if (!user) {
				return res.render('admin/login', { error:'这个用户不存在。' });
			}
			pass = util.md5(pass);
			if(pass!=user.pass){
				return res.render('admin/login', { error:'密码不正确。' });
			}
			req.session.user = user;
			gen_session(user,res);
			
			res.redirect('/admin/article_1');
		})
	}else{
		if(common.isLogin(req,res,next)){
			res.redirect("/admin/article_1");
			return;
		}
		res.render("admin/login",{error:""});
	}
	
	
}
//注册
exports.signin = function(req,res,next){
	var method = req.method.toLowerCase();
	if(method=="post"){
		console.log(req.body.loginname);
		var loginname = sanitize(req.body.loginname).trim();
		console.log(req.body.pass);
		var pass = util.md5(sanitize(req.body.pass).trim());
		var name = sanitize(req.body.username).trim();
		var user = new User();
		user.loginname = loginname;
		user.pass = pass;
		user.name = name;
		user.save(function(err){
			if(err){
				return next(err);
			}
			res.redirect('/admin/login');
		})
	}else{
		res.render("admin/sign");
	}
	
}



// private
function gen_session(user,res) {
	var auth_token = encrypt(user._id + '\t'+user.name + '\t' + user.pass +'\t' + user.email, config.session_secret);
	res.cookie(config.auth_cookie_name, auth_token, {path: '/',maxAge: 1000*60*60*24*7}); //cookie 有效期1周			
}
function encrypt(str,secret) {
   var cipher = crypto.createCipher('aes192', secret);
   var enc = cipher.update(str,'utf8','hex');
   enc += cipher.final('hex');
   return enc;
}
function decrypt(str,secret) {
   var decipher = crypto.createDecipher('aes192', secret);
   var dec = decipher.update(str,'hex','utf8');
   dec += decipher.final('utf8');
   return dec;
}