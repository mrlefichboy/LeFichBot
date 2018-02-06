const discord = require ("discord.js");

exports.mute = async function (message, user1, bot){	
		if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You dont have permission to do that");
		if (user1.id === bot.user.id) message.reply("Do not even try that!!!")
		if (!user1) return message.reply("You did not specify a user mention or ID!");
		if (message.author.id === user1.id) return message.reply("You cant do that to your self")
		if (user1.highestRole.position >= message.member.highestRole.position) return message.reply("You cannot mute that member");
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
		
		await user1.addRole(role);
		message.channel.send("muted")
	}

exports.unMute = async function (message, user1){
		if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You dont have permission to do that");
		if (!user1) return message.reply("You did not specify a user mention or ID!");
		if (message.author.id === user1.id) return message.reply("You cant do that to your self")
		if (user1.highestRole.position >= message.member.highestRole.position) return message.reply("You cannot mute that member");
		let role = message.guild.roles.find( r => r.name === "muted");
		
		if (!role || !user1.roles.has(role.id)) return message.channel.send("This user is not muted");
		
		await user1.removeRole(role);
		message.channel.send("unmuted")
}	