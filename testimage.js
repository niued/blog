var fs = require('fs');
var path = require('path');

var im = require('imagemagick');
var sys = require('util');
im.resize({
  	srcPath: new_path,
  	dstPath: thumb_path,
  	width: 256
}, function(err, stdout, stderr){
	if(err){
		console.log("resize error!"+err);
	}else{
		console.log("resize success!");
	}
  
})