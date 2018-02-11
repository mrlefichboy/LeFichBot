const fs = require('fs');
const discord = require ("discord.js");


module.exports.run = async (bot, message, args, msg) => {
	message.delete();
	let	user1 = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
	if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You dont have permission to do that.");
		if (user1.id === bot.user.id) message.reply("Do not even try that!!!")
		if (!user1) return message.reply("You did not specify a user mention or ID!");
		if (message.author.id === user1.id) return message.reply("You cant do that to your self.")
		if (user1.highestRole.position >= message.member.highestRole.position) return message.reply("You cannot mute that member.");
		let role = message.guild.roles.find( r => r.name === "muted");
		if (!role) {
			try {
				role = await message.guild.createRole({
					name : "muted",
					color : "#000000",
					permissions : []
				});
				
				message.guild.channels.forEach(async (channel, id) => {
					await channel.overwritePermissions(role, {
						SEND_MESSAGES: false, 
						ADD_REACTIONS: false,
						READ_MESSAGES : true
					});
				});
			} catch (e){
				console.log(e.stack);
			}
		}
		if (user1.roles.has(role.id)) return message.channel.send("This user is already muted");
		
		let roles = "";
		
		user1.roles.forEach(function(role, roleId){
			if (role.name === "@everyone") {
				roles = roles;
			} else {
				roles = roles + role.name + ",";
			}
		});
		
		let role3 = "";
		
		user1.roles.forEach(function(role, roleId){
			if (role.name === "@everyone") {
				role3 = role3;
			} else {
				role3 = role3 + role.name + ",";
				let role4 = message.guild.roles.find( r => r.name === role.name);
				user1.removeRole(role4);
			}
		});

		bot.muted[user1.id] = {
			guild: message.guild.id,
			time: Date.now() + parseInt(args[0]) * 1000,
			role: roles
	}

	fs.writeFile("./json_file/muted.json", JSON.stringify(bot.muted, null, 4), err => {
		if (err) throw err
	})
		
		await user1.addRole(role);
		message.channel.send(user1 + "Has been muted for " + args[1] + "sec")
	}

module.exports.help = {
	name: "mute"
}