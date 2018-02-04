const bs = require("./setting.json");
const prf = bs.prf;
const discord = require ("discord.js");
const bot = new discord.Client;
const moment = require("moment");
const muisti = require("./arvoja.json");
const ajastin = require("node-schedule");
const paiva = moment ([2018, 1, 2]);
const fs = require('fs');
const giphy = require('giphy-api')();
let b = "";


bot.on("ready", () => {
	
	console.log(`Bot is ready! ${bot.user.username}`);

});

//bot.login(bs.token);
bot.login(process.env.BOT_TOKEN);
		
	var j = ajastin.scheduleJob('33 9 * * *', function(){
			let paiva2 = moment();
			let num = paiva2.diff(paiva, `days`);
			num += 971;
			let nro = num.toString();
			let aray2 = nro.split("")
			aray2.forEach(function(element) {
				if (element === "0") b = b + ":zero:";
				else if (element === "1") b = b + ":one:";
				else if (element === "2") b = b + ":two:";
				else if (element === "3") b = b + ":three:";
				else if (element === "4") b = b + ":four:";
				else if (element === "5") b = b + ":five:";
				else if (element === "6") b = b + ":six:";
				else if (element === "7") b = b + ":seven:";
				else if (element === "8") b = b + ":eight:";
				else b = b + ":nine:";
			});
		bot.channels.get(`394578683114815499`).send(b);
		b = "";
	console.log("done");
	});

		bot.on("message", async message => {
			
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;

	let msaray = message.content.split(" ");
	if (!message.content.startsWith(prf)) return;
	
	let cm = msaray[0];
	let args = msaray.slice(1);
	let info = args[0];
	
	
	if (cm === `${prf}bg`) {
		message.delete();
		let array1 = info.split("");
		let arry = array1;
		array1 = [];
		arry.forEach(function(element) {
			if (isNaN(element))b = b + ":regional_indicator_" + element + ": ";
			else if (element === "0") b = b + ":zero:";
			else if (element === "1") b = b + ":one:";
			else if (element === "2") b = b + ":two:";
			else if (element === "3") b = b + ":three:";
			else if (element === "4") b = b + ":four:";
			else if (element === "5") b = b + ":five:";
			else if (element === "6") b = b + ":six:";
			else if (element === "7") b = b + ":seven:";
			else if (element === "8") b = b + ":eight:";
			else b = b + ":nine:";
		});
		message.channel.send(b);
		b = "";
	};
	
});
