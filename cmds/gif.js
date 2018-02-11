const giphy = require('giphy-api')('Rwev3tsFgdkDyCkYjRsMoJ9YLsvmatnU');
const discord = require ("discord.js");

module.exports.run = async (bot,message, args, msg) => {
	message.delete();
	let gif = args[0];
	giphy.random({
		tag: gif,
		rating: 'pg',
		fmt: 'json'
	}, function (err, res) {
		message.reply({files: [res.data.image_url]});
	});
}

module.exports.help = {
	name: "gif"
}