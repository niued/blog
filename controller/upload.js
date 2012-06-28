var fs = require('fs');
var path = require('path');

var upload_path = path.join(path.dirname(__dirname), 'static/upload');

exports.image = function(req, res, next) {
	var host = req.headers.host;
	var file = req.files.imgFile;
	// sould use async
	if (file) {
		var name = file.name;
		var ext = name.substr(name.lastIndexOf('.'),4);
		var uid = req.session.user._id.toString();
		var time = new Date().getTime();
		var new_name = uid + time + ext;
		var thumb_name = uid + time + "_s";
		var new_path = path.join(upload_path, new_name);
		var thumb_path = path.join(upload_path, thumb_name);
		fs.rename(file.path, new_path, function(err) {
			if (err) {
				return next(err);
			}
			var url = 'http://' + host + '/upload/' + new_name;
			res.json({ error: 0, url: url });
		});
	}else{
		res.json({ error: 1, message: "出错了!" });
	}

};