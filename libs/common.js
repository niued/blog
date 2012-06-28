/**
全站通用类
*/

exports.isLogin = function(req,res,next){
	if(req.session&&req.session.user){
		return true;
	}else{
		return false;
	}
}

exports.format_date = function(date,friendly) {
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	
	if(friendly){
		var now = new Date();
		var mseconds = -(date.getTime()-now.getTime());
		var time_std = [1000,60*1000,60*60*1000,24*60*60*1000];
		if(mseconds < time_std[3]) {
			if(mseconds > 0 && mseconds < time_std[1]) {
				return Math.floor(mseconds/time_std[0]).toString() + ' 秒前';
			}
			if(mseconds > time_std[1] && mseconds < time_std[2]) {
				return Math.floor(mseconds/time_std[1]).toString() + ' 分钟前';
			}
			if(mseconds > time_std[2]) {
				return Math.floor(mseconds/time_std[2]).toString() + ' 小时前';
			}
		}
	}
	
	//month = ((month < 10) ? '0' : '') + month;
	//day = ((day < 10) ? '0' : '') + day;
	hour = ((hour < 10) ? '0' : '') +hour;
	minute = ((minute < 10) ? '0' : '') + minute;
	second = ((second < 10) ? '0': '') +second;
	
	return year + '-' + month + '-' + day;
};
exports.isValidDate = function(d){
  if ( Object.prototype.toString.call(d) !== "[object Date]" )
    return false;
  return !isNaN(d.getTime());
}

