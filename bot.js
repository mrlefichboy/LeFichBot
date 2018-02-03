const bs = require("./setting.json");
const prf = bs.prf;
const discord = require ("discord.js");
const bot = new discord.Client;
const moment = require("moment");
const muisti = require("./arvoja.json");
let b = "";
var array1

// expected output: "a"
// expected output: "b"
// expected output: "c"

bot.on("ready", () => {
	console.log('Bot is ready! ${bot.user.username}');
});

bot.login(bs.token);

bot.on("message", async message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;

	
	let msaray = message.content.split(" ");
	if (!message.content.startsWith(prf)) return;
	
	let cm = msaray[0];
	let args = msaray.slice(1);
	let info = args[0];
	
	let f = message.channel;
	

	//message.channel.sendMessage(message.channel);

	
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
		
		message.channel.sendMessage(b);
		b = "";
	};
	let a = moment();
	let c = moment ([2017, 2, 1]);
});

//fs.write.file("./arvoja.json", "lel:lol");