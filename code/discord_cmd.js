const discord = require ("discord.js");
const fs = require("fs");

exports.mute = async function (message, user1, bot, info, muted){	
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

	muted[user1.id] = {
		guild: message.guild.id,
		time: Date.now() + parseInt(info) * 1000,
		role: roles
	}
		
	fs.writeFile("./json_file/muted.json", JSON.stringify(muted, null, 4), err => {
		if (err) throw err
	})
		
		await user1.addRole(role);
		message.channel.send(user1 + "Has been muted for " + info + "sec")
	}

exports.unMute = async function (message, user1, muted){
		if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You dont have permission to do that");
		if (!user1) return message.reply("You did not specify a user mention or ID!");
		if (message.author.id === user1.id) return message.reply("You cant do that to your self")
		if (user1.highestRole.position >= message.member.highestRole.position) return message.reply("You cannot mute that member");
		let role = message.guild.roles.find( r => r.name === "muted");
		let oldRoles = muted[user1.id].role
		let oldRoles1 = oldRoles.split(",")
		
		if (!role || !user1.roles.has(role.id)) return message.channel.send("This user is not muted");
		
		await user1.removeRole(role);
		
		oldRoles1.forEach(function(role1) {
			let role2 = message.guild.roles.find(r => r.name === `${role1}`);
			if(!role2) return;
			user1.addRole(role2);
		});
		
		delete muted[user1.id];
			fs.writeFile("./json_file/muted.json", JSON.stringify(muted, null, 4), err => {
		if (err) throw err
		message.channel.send("unmuted")
	})
}
