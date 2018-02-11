const discord = require ("discord.js");

module.exports.run = async (bot,message, args) => {
	message.delete();
	let	user1 = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
			if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You dont have permission to do that.");
		if (user1.id === bot.user.id) message.reply("Do not even try that!!!")
		if (!user1) return message.reply("You did not specify a user mention or ID!");
		if (message.author.id === user1.id) return message.reply("You cant do that to your self.")
		if (user1.highestRole.position >= message.member.highestRole.position) return message.reply("You cannot mute that member.");
		message.guild.unban(user1.id)
}

module.exports.help = {
	name: "unban"
}