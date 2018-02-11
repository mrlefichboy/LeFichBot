const fs = require('fs');
const discord = require ("discord.js");

module.exports.run = async (bot, message, args, msg) => {
	message.delete();
	let	user1 = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
	if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You dont have permission to do that");
		if (!user1) return message.reply("You did not specify a user mention or ID!");
		let role = message.guild.roles.find( r => r.name === "muted");
		let oldRoles = bot.muted[user1.id].role
		let oldRoles1 = oldRoles.split(",")
		
		if (!role || !user1.roles.has(role.id)) return message.channel.send("This user is not muted");
		
		await user1.removeRole(role);
		
		oldRoles1.forEach(function(role1) {
			let role2 = message.guild.roles.find(r => r.name === `${role1}`);
			if(!role2) return;
			user1.addRole(role2);
		});
		
		delete bot.muted[user1.id];
			fs.writeFile("./json_file/muted.json", JSON.stringify(bot.muted, null, 4), err => {
		if (err) throw err
		message.channel.send("unmuted")
	})
}



module.exports.help = {
	name: "unmute"
}