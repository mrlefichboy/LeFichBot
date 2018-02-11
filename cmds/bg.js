
module.exports.run = async (bot,message, args, msg) => {
	message.delete();
		let b = ""
		let array1 = msg.split("");
		array1.forEach(function(element) {
			if (isNaN(element))b = b + ":regional_indicator_" + element + ":";
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
}

module.exports.help = {
	name: "bg"
}