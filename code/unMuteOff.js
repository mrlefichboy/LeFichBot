const discord = require ("discord.js");
const fs = require('fs');

exports.unMute = function (i, muted, bot) {
	let time = muted[i].time;
	let guilId = muted[i].guild;
	let guild1 = bot.guilds.get(guilId);
	let mutedRole = guild1.roles.find(r => r.name === "muted");
	let oldRoles = muted[i].role
	let oldRoles1 = oldRoles.split(",")
	let member = guild1.members.get(i)
	//if (!mutedRole) continue;
	if (Date.now() > time){
		member.removeRole(mutedRole);
		oldRoles1.forEach(function(role1) {
			let role2 = guild1.roles.find(r => r.name === `${role1}`);
			if(!role2) return;
			member.addRole(role2);
		});
		delete muted[i];
				
		fs.writeFile("./json_file/muted.json", JSON.stringify(muted, null, 4), err => {
		if (err) throw err
		});
	}
}