const bs = require("./json_file/setting.json");
const muisti = require("./json_file/arvoja.json");

const moment = require("moment");
const ajastin = require("node-schedule");
const fs = require('fs');
const giphy = require('giphy-api')();

const discord = require ("discord.js");
const big = require("./code/big.js");

const prf = bs.prf;
const paiva = moment ([2018, 1, 2]);
const bot = new discord.Client;

let b = "";


bot.on("ready", () => {
	console.log(`Bot is ready! ${bot.user.username}`);
	bot.user.setPresence({ status: 'online', game: { name: 'Playing with your mam' } });
});

//bot.login(bs.token);
bot.login(process.env.BOT_TOKEN);
		
	
bot.on("message", async message => {

			
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;

	let msaray = message.content.split(" ");
	if (!message.content.startsWith(prf)) return;
	

	
	let cm = msaray[0];
	let args = msaray.slice(1);
	let info = args[0];
	
	let msg = "";
	args.forEach(function(element){
		msg = msg + element;
	});
	
	if (cm === `${prf}bg`) {
		message.delete();
		message.channel.send(big.big(msg));
	};
});



bot.on("message", async message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;
	
	if (message.content.indexOf("!volle") !== -1){
		message.reply("WOW", {files: ["https://cdn.discordapp.com/attachments/394576839378731019/408917377527447562/image.jpg"]});
	};
});



	var j = ajastin.scheduleJob('0 7 * * *', function(){
		let paiva2 = moment();
		let num = paiva2.diff(paiva, `days`);
		num += 971;
		let nro = num.toString();
		bot.channels.get(`394578683114815499`).sendMessage(big.big(nro));
	});
