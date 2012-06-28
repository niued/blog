exports.index = function(req,res,next){
	res.render("index");
}
exports.version = function(req,res,next){
	res.render("version");
}
exports.admin = function(req,res,next){
	res.send("<div>121221</div>");
}
