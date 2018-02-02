const bs = require("./setting.json");
const prf = bs.prf;
const discord = require ("discord.js");
const bot = new discord.Client;
let b = "";


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
	var ggwp = bot.channel.find("406371324865544205");
	bot.sendMessage(ggwp, "lelle");
	
	let msaray = message.content.split(" ");
	if (!message.content.startsWith(prf)) return;
	
	let cm = msaray[0];
	let args = msaray.slice(1);
	let info = args[1];
	var array1 = info.split("");
	
	if (cm === `${prf}bg`) {
		

		array1.forEach(function(element) {
			b = b + element;
		});
		
		message.channel.sendMessage(b);
	};
	
	console.log(msaray);
	console.log(cm);
	console.log(args);
	
	
});



console.log(process.env.BOT_TOKEN);