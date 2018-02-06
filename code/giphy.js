const giphy = require('giphy-api')('Rwev3tsFgdkDyCkYjRsMoJ9YLsvmatnU');
var a = ""
const discord = require ("discord.js");

exports.gif = function (gif, message){
	giphy.random({
		tag: gif,
		rating: 'pg',
		fmt: 'json'
	}, function (err, res) {
		message.reply(res.data.image_url);
	});
}