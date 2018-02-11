const bs = require("./json_file/setting.json");
const muisti = require("./json_file/arvoja.json");

const moment = require("moment");
const ajastin = require("node-schedule");
const fs = require('fs');
const discord = require ("discord.js");

const unMuteOff = require("./code/unMuteOff.js");
const big = require("./code/big.js");

const prf = bs.prf;
const paiva = moment ([2018, 1, 2]);
const bot = new discord.Client;

bot.commands = new discord.Collection();
bot.muted = require("./json_file/muted.json");



fs.readdir("./cmds/", (err, files) => {
	if (err) console.error(err);

	let jsFiles = files.filter(f => f.split(".").pop() === "js");
	if(jsFiles.lengt <= 0){
		console.log("no command found");
	}
	console.log(`loding ${jsFiles.length} commands`);

	jsFiles.forEach((f, i) => {
		let props = require(`./cmds/${f}`);
		console.log(`${i + 1}: ${f} loaded`);
		bot.commands.set(props.help.name, props);

	});
});




bot.on("ready",() => {
	console.log(`Bot is ready! ${bot.user.username}`);
	bot.user.setPresence({ status: 'online', game: { name: 'Playing with your mam' } });
	
	bot.setInterval(() =>  {
		for(let i in bot.muted) {
		unMuteOff.unMute(i, bot.muted, bot);
		}
	}, 5000)
});
//
//bot.login(bs.token);
bot.login(process.env.BOT_TOKEN);
		
	
bot.on("message", async message => {

			
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;

	let msaray = message.content.split(" ");
	if (!message.content.startsWith(prf)) return;
	
	let cm = msaray[0];
	let args = msaray.slice(1);
	
	let msg = "";
	args.forEach(function(element){
		msg = msg + element;
	});

	let cmd = bot.commands.get(cm.slice(prf.length))
	if(cmd) cmd.run(bot, message, args, msg)

});



bot.on("message", async message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;

	let file = "https://media0.giphy.com/media/11aCNnhizTWfXW/giphy.gif";

	//homo command
	if (message.content.indexOf("homo ")!== -1){
		message.reply("No I'm not\n", {files: [file]});
	} else if (message.content.indexOf("Homo ")!== -1){
	message.reply("No I'm not\n", {files: [file]});
	} else if (message.content.indexOf("HOMO ")!== -1){
		message.reply("No I'm not\n", {files: [file]});
	};

	//true command
	if (message.content.indexOf("TRUE")!== -1){
		message.channel.sendMessage("TRUE\n https://media1.giphy.com/media/3ohc19EK1gypvsYQgg/giphy.gif");
	}
});

//ajastin
	var j = ajastin.scheduleJob('0 7 * * *', function(){
		let paiva2 = moment();
		let num = paiva2.diff(paiva, `days`);
		num += 971;
		let nro = num.toString();
		bot.channels.get(`${process.env.kanava}`).sendMessage(big.big(nro));
	});
	