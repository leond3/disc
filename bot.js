const Discord = require('discord.js');
const { prefix } = require('./config.json');

const fs = require("fs");

const client = new Discord.Client();

client.once('ready', ready => {
	console.log('MineCraft bot responded and is operational!');
	client.user.setStatus('online');
	client.user.setActivity('Made by Leon#1250');
});

client.on('guildMemberAdd', member => {	
	message.guild.channels.get(r => r.name === "public").sendMessage(member.mention + " just joined the discord server.\nGo to <#667042753179287572> for more features.");
});

client.on('message', message => {
	let blacklisted = ["kank", "kk ", "k@nk", "suck ", "mongool", "idioot", "idiot", "stfu", "shut ", "bek ", "tyf", "auti", "bitch", "eikel", "hoer", "homo", "kut", "lul ", "pedo", "mof", "slet", "tering", "k4nk", "fack", "fuck", "fk ", "h0m0", "h0mo", "hom0", "gay", "g4y", "sukkel", "niger", "nigger", "g@y", "n1g", "f@ck", "f*ck", "h*m", "g*y", "b*tch", "k*nk", "`@", "` @", "tief", "ï", "k*nk", "debiel", "jij bent dom", "jij bent echt dom", "neger", "negger", "kys", "kill yourself", "kill your self", "kill urself", "kill ur self", "äut", "sükk", "fä", "fü", "profile boost", "voor boost", "𝓴𝓪𝓷𝓴𝓮𝓻", "ⓝⓘⓖⓖⓐ", "𝓃𝒾𝑔𝑔𝒶"];
	for (var i in blacklisted) {
		if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase()) && !message.author.bot) {
			message.delete(200);
			message.channel.send(":warning: " + message.member.user.tag + " you cannot use blacklisted words or characters in your message:\n||`" + message.content + "`||").then(msg => {msg.delete(12000)});
		}
	}

	if (message.member.roles.find(r => r.name === "MUTE")) {
		message.channel.send(":mute:" + message.member.user.tag + " you have been muted by an administrator.").then(msg => {msg.delete(2000)});
		message.delete(200);
	}

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	
	if (!message.content.startsWith(prefix) && !message.author.bot) {
		if (message.channel.id === "628953682934890538" || message.channel.id === "633699224244191242" || message.channel.id === "643557830162645030" || message.channel.id === "725029808094052453" || message.channel.id === "629330312232435736" || message.channel.id === "640818734633582602") {
			message.guild.channels.get('682165828535451658').send(message.member.user.tag + " in <#" + message.channel.id + "> (" + message.id + "):\n'`" + message.content + "`'");
		}
	}
	if (message.content.startsWith(prefix) && !message.author.bot && command === 'fetch' && args[0] && message.member.roles.find(r => r.name === "Administrator")) {
		message.guild.channels.get('682165828535451658').send(":wastebasket: " + message.member.user.tag + " deleted: " + args[0]);
		message.delete(500);
		message.channel.fetchMessage(args[0]).then(msg => {msg.delete(500)});
		message.channel.send("deleting message...").then(msg => {msg.delete(500)});
	}
	
	if (message.content.startsWith(prefix) || !message.author.bot) {
		if (command === 'muteall' && message.member.roles.find(r => r.name === "Bot builder")) {
			message.channel.overwritePermissions(message.channel.guild.defaultRole, { SEND_MESSAGES: false });
			message.channel.send("Server chat messages: **Disabled**.").then(msg => {msg.delete(72000000)});
			message.delete();
		}
		if (command === 'muteall' && !message.member.roles.find(r => r.name === "Bot builder")) {
			message.channel.send(":no_entry: **You do not have the right permissions to execute this command, try: '!help'.**").then(msg => {msg.delete(4000)});
			message.delete();
		}
		if (command === 'unmuteall' && message.member.roles.find(r => r.name === "Bot builder")) {
			message.channel.overwritePermissions(message.channel.guild.defaultRole, { SEND_MESSAGES: true });
			message.channel.send("Server chat messages: **Enabled**.").then(msg => {msg.delete(72000000)});
			message.delete();
		}
		if (command === 'unmuteall' && !message.member.roles.find(r => r.name === "Bot builder")) {
			message.channel.send(":no_entry: **You do not have the right permissions to execute this command, try: '!help'.**").then(msg => {msg.delete(4000)});
			message.delete();
		}
		if (command === 'clearchat' && message.member.roles.find(r => r.name === "Bot builder")) {
			async function clearchat() {
	            	message.delete();
	            	const fetched = await message.channel.fetchMessages({limit: 999});
	            	message.channel.bulkDelete(fetched);
	        	}
			clearchat();
		}
		if (command === 'mcnotify') {
			if (message.member.roles.find(r => r.name === "Moderator") || message.member.roles.find(r => r.name === "Administrator")) {
				message.channel.send(":envelope: Notification detected!").then(msg => {msg.delete(4000)});
				message.channel.send("`" + message.content.slice(10) + "`\n\n*This message will be deleted in 2 minutes.*\n<@&671293618421497868> *(You can enable/disable notifications by typing '!notifications' in <#667042753179287572>)*").then(msg => {msg.delete(120000)});
			}
			else {
				message.channel.send(":no_entry: You do not have the permission to create a server notification.\n*Please contact a Moderator if you want to create a notification*").then(msg => {msg.delete(4000)});
			}
			message.delete();
		}
		if (command === 'clearchat' && !message.member.roles.find(r => r.name === "Bot builder")) {
			message.channel.send(":no_entry: **You do not have the right permissions to execute this command, try: '!help'.**").then(msg => {msg.delete(4000)});
			message.delete();
		}
	}
	
	if(message.channel.name == "giveaways") {
		if (command === 'gstart' && message.member.roles.find(r => r.name === "Giveaways") && !message.author.bot) {
			message.delete(4000);
			message.channel.send(":tada: Giveaway detected").then(msg => {msg.delete(4000)});
		}
		else if (command === 'gstart' && !message.member.roles.find(r => r.name === "Giveaways") && !message.author.bot) {
			message.delete(4000);
			message.channel.send(":no_entry: No permissions").then(msg => {msg.delete(4000)});
		}
		else if (!message.member.roles.find(r => r.name === "Giveaway") && !message.author.bot) {
			message.delete(300000);
		}
	}
	if(message.channel.name == "music") {
		if (message.content.startsWith(prefix) && !message.author.bot) {
			message.delete(4000);
		}
		else if (message.member.roles.find(r => r.name.toLowerCase() === "music")) {
			message.delete(10000);
		}
		else if (!message.content.startsWith(prefix) && !message.author.bot) {
			message.delete();
			message.channel.send(":no_entry: **You can't chat in this channel, try: '!help'.**").then(msg => {msg.delete(4000)});
		}
	}
	if(message.channel.name == "music-verify") {
		if (message.content.startsWith(prefix) && !message.author.bot) {
			if (command === 'verify') {
				if (message.member.roles.find(r => r.name.toLowerCase() === "dj")) {
					message.channel.send(":grey_question: It seems like you already verified, weird!\n Try switching to the <#716038164266877040> channel.").then(msg => {msg.delete(4000)});
					message.delete(200);
					return;
				}
				message.channel.send(":white_check_mark: " + message.member.user.tag + " gained access to the <#716038164266877040> channel.").then(msg => {msg.delete(4000)});
				message.member.addRole(message.guild.roles.find(r => r.name.toLowerCase() == "dj"));
			}
			message.delete(200);
		}
		else if (!message.content.startsWith(prefix) && !message.author.bot) {
			message.delete(200);
			message.channel.send(":no_entry: **You can't chat in this channel, try: '!verify'.**").then(msg => {msg.delete(4000)});
		}
	}
	
	if(message.channel.name == "skyblock-commands") {
		if (!message.content.startsWith(prefix) || message.author.bot) {
			if (!message.author.bot) { 
				message.delete();
				message.channel.send(":no_entry: **You can't chat in this channel, try: '!help'.**").then(msg => {msg.delete(4000)});
			}
			return;
		}
		if (command === 'help') {
			message.channel.send('**Bot command list:**\n - !help\n - !talisman\n - !reforge\n - !stats [username]').then(msg => {msg.delete(30000)});
			message.delete(30000);
		}
		else if (command === 'reforge') {
			message.channel.send("**Damage:**\nArmor: Godly\nSword: Spicy\nBow: Rapid\nLegendary/Epic talisman: Godly\nRare talisman: Itchy\nUncommon/Common talisman (*80%< crit chance*): Itchy\nUncommon/Common talisman (*80%>crit chance*): Godly/Zealous\n\n**HP&Defence:**\nArmor: Titanic\nSword: -\nBow: -\nTalisman: Ominous\n\n**Mana:**\nArmor: Wise\nSword: Legendary\nBow: Deadly\nTalisman:Bizarre/Pretty\n\n\n*Tag de 'Tag Me' bot als je je talisman optimaal wilt reforgen*").then(msg => {msg.delete(30000)});
			message.delete(30000);
		}
		else if (command === 'talisman') {
			message.channel.send("**Common:**\n - Mine Affinity Talisman\n - Village Affinity Talisman\n - Farming Talisman\n - Wolf Talisman (U)\n - Zombie Talisman (U)\n - Skeleton Talisman\n - Scavenger Talisman\n - Intimidation Talisman (U)\n - Talisman of Coins\n - Potion Affinity Talisman (U)\n - Vaccine Talisman\n - Night Vision Charm\n - Fire Talisman\n - Healing Talisman (U)\n - Speed Talisman\n - Feather Talisman (U)\n - Sea Creature Talisman (U)\n\n**Uncommon:**\n - Wood Affinity Talisman\n - Potion Affinity Ring (U)\n - Zombie Ring (U)\n - Feather Ring (U)\n - Red Claw Talisman (U)\n - Magnetic Talisman\n - Hunter Talisman (U)\n - Farmer Orb\n - Gravity Talisman\n - Piggy Bank\n - Lava Talisman\n - Spider Talisman (U)\n - Sea Creature Ring (U)\n - Healing Ring (M)\n - Wolf Paw\n - Intimidation Ring (U)\n - Shady Ring (U)\n - New Years Cake Bag\n - Candy Ring (U)\n\n**Rare:**\n - Haste Ring\n - Potion Affinity Artifact (M)\n - Survivor Cube\n - Hunter Ring (M)\n - Fish Affinity Talisman\n - Feather Artifact (M)\n - Bat Talisman (U)\n - Pig's Foot\n - Spider Ring (U)\n - Bait Ring\n - Candy Ring (U)\n - Day Crystal\n - Night Crystal\n - Red Claw Ring (U)\n - Devour Ring\n - Sea Creature Artifact (M)\n - Intimidation Artifact (M)\n - Wolf Ring (M)\n - Crooked Artifact (U)\n - Frozen Chicken\n\n**Epic:**\n - Ender Artifact\n - Spider Artifact (M)\n - Tarantula Talisman\n - Red Claw Artifact (M)\n - Candy Artifact (M)\n - Bat Ring (U)\n - Experience Artifact\n - Melody's Hair\n - Wither Artifact\n - Seal of the Family (M)\n\n**Legendary:**\n - Bat Artifact (M)\n\n**Others:**\n - Campfire Quest (common-legendary)\n - Romero Quest (common-legendary)\n\n\n*Tag de 'Tag Me' bot als je je talisman optimaal wilt reforgen*").then(msg => {msg.delete(30000)});
			message.delete(30000);
		}
		else if (command === 'stats') {
			if (args[0]) { message.channel.send("https://sky.lea.moe/stats/" + args[0] + "\nhttps://skyblock.matdoes.dev/profiles/" + args[0]).then(msg => {msg.delete(30000)}); }
			else { message.channel.send(":no_entry: **Invalid Argument, try: '!help'.**").then(msg => {msg.delete(4000)}); }
			message.delete(30000);
		}
		else {
			message.delete();
			message.channel.send(":no_entry: **Invalid Command, try: '!help'.**").then(msg => {msg.delete(4000)});
		}
	}
	
	if(message.channel.name == "admin-commands") {
		if (!message.content.startsWith(prefix) || message.author.bot) {
			if (!message.author.bot) { 
				message.delete(10000);
			}
			return;
		}
		if (command === 'help') {
		message.channel.send('**Bot command list:**\n - !help\n - !privatecall\n - !promote [mention]\n - !demote [mention]\n - !mute [mention]\n - !unmute [mention]\n - /nick [name]').then(msg => {msg.delete(300000)});
		message.delete(300000);
		}
		else if (command === 'privatecall' || command === 'pc') {
			const voiceChannel = message.member.voiceChannel;
			let privatechannels = ["667089585527980062", "672407468130959371", "672407491807543297", "672407504914743318", "672407514259914762", "672407536741122048", "672407548229320754", "672407558270746635", "672407597248151591", "672407607004364801"];

			if (voiceChannel && message.member.roles.find(r => r.name === "Moderator") || voiceChannel && message.member.roles.find(r => r.name === "Administrator")) {
				message.member.setVoiceChannel(privatechannels[getRandomInt(0,10)]);
				message.channel.send(":white_check_mark: User has been succesfully moved to a private channel.\n*You've to manually move users into this call!*").then(msg => {msg.delete(6000)});				
			}
			else if (!voiceChannel && message.member.roles.find(r => r.name === "Moderator") || !voiceChannel && message.member.roles.find(r => r.name === "Administrator")) {
				message.channel.send(":no_entry: User is not connected to a channel and thus can't be moved.").then(msg => {msg.delete(6000)});
			}
			else {
				message.channel.send(":no_entry: You do not have the permission to create a private call.\n*Please contact a Moderator if you need a private call*").then(msg => {msg.delete(6000)});
			}
			message.delete();
		}
		else if (command === 'notify') {
			if (message.member.roles.find(r => r.name === "Administrator")) {
				const mention = message.mentions.members.first();
				const mentionMessage = message.content.slice(8);
				if (mention.roles.find(r => r.name === "Notifications")) {
					mention.sendMessage(mentionMessage + "\n\n*These messages may be disabled by disabling notifications in the discord-commands channel, this notification will be automatically deleted after 60 minutes.*").then(msg => {msg.delete(3600000)});
					message.channel.send(":incoming_envelope: Notification succesfully send!").then(msg => {msg.delete(4000)});
					message.guild.channels.get('682165828535451658').send(message.member.user.tag + " sent a notification to: " + mention + ".");
				}
				else {
					message.channel.send(":no_entry: This user has notifications disabled!").then(msg => {msg.delete(4000)});
				}
			}
			else {
				message.channel.send(":no_entry: You do not have the right permission to execute this command, or this user has notifications disabled!").then(msg => {msg.delete(4000)});
			}
			message.delete();
		}
		else if (command === 'promote') {
			const mention = message.mentions.members.first();
			if (!mention.roles.find(r => r.name === "Moderator") && !mention.roles.find(r => r.name === "Administrator")) {
				mention.addRole(message.guild.roles.find(r => r.name.toLowerCase() == "moderator"));
				message.channel.send(":white_check_mark: Succesfully updated rank!").then(msg => {msg.delete(4000)});
			}
			else if (mention.roles.find(r => r.name === "Moderator") || mention.roles.find(r => r.name === "Administrator")) {
				message.channel.send(":no_entry: Couldn't promote to a higher rank :(").then(msg => {msg.delete(4000)});
			}
			else {
				message.channel.send(":no_entry: **Invalid Argument, try: '!help'.**").then(msg => {msg.delete(4000)});
			}
			message.delete(4000);
		}
		else if (command === 'demote') {
			const mention = message.mentions.members.first();
			if (mention.roles.find(r => r.name === "Moderator")) {
				mention.removeRole(message.guild.roles.find(r => r.name.toLowerCase() == "moderator"));
				message.channel.send(":white_check_mark: Succesfully updated rank!").then(msg => {msg.delete(4000)});
			}
			else if (!mention.roles.find(r => r.name === "Moderator")) {
				message.channel.send(":no_entry: Couldn't demote to a lower rank :(").then(msg => {msg.delete(4000)});
			}
			else {
				message.channel.send(":no_entry: **Invalid Argument, try: '!help'.**").then(msg => {msg.delete(4000)});
			}
			message.delete(4000);
		}
		else if (command === 'mute') {
			const mention = message.mentions.members.first();
			if (!mention.roles.find(r => r.name === "MUTE") && !mention.roles.find(r => r.name === "Administrator")) {
				mention.addRole(message.guild.roles.find(r => r.name.toLowerCase() == "mute"));
				message.channel.send(":white_check_mark: Succesfully muted user!").then(msg => {msg.delete(4000)});
			} else if (mention.roles.find(r => r.name === "Administrator")) {
				message.channel.send(":warning: Wait... you can't mute that user!").then(msg => {msg.delete(4000)});
			}
			else {
				message.channel.send(":no_entry: User is already muted!").then(msg => {msg.delete(4000)});
			}
			message.delete(4000);
		}
		else if (command === 'unmute') {
			const mention = message.mentions.members.first();
			if (mention.roles.find(r => r.name === "MUTE")) {
				mention.removeRole(message.guild.roles.find(r => r.name.toLowerCase() == "mute"));
				message.channel.send(":white_check_mark: Succesfully unmuted user!").then(msg => {msg.delete(4000)});
			} else {
				message.channel.send(":no_entry: User is not muted!").then(msg => {msg.delete(4000)});
			}
			message.delete(4000);
		}
	}
	
	if(message.channel.name == "discord-commands") {
		if (!message.content.startsWith(prefix) || message.author.bot) {
			if (!message.author.bot) { 
				message.delete(10000);
			}
			return;
		}
		if (command === 'help') {
		message.channel.send('**Bot command list:**\n - !help\n - !bot\n - !color [color/list]\n - !tag [tag/list]\n - !cf\n - !quickquestion\n - !notifications\n - !privatecall\n - /nick [name]').then(msg => {msg.delete(300000)});
		message.delete(300000);
		}
		else if (command === 'bot') {
			const BotEmbed = new Discord.RichEmbed()
				.setColor('#808080')
				.setTitle('**MineCraft Bot**')
				.setDescription("MineCraft Discord Server\nType: '!help' to get started\n\n*- Anti-Swear\n- Custom Commands\n- Chat Control\n- Role Support\n- Server Moderation*")
				.attachFiles(['assets/bot.png'])
				.setFooter('Made by Leon#1250')
				.setThumbnail('attachment://bot.png')
			message.channel.send(BotEmbed).then(msg => {msg.delete(300000)});
			message.delete(300000);
		}
		else if (command === 'color') {
			if (!args[0]) {
				message.delete();
				message.channel.send(":no_entry: **Invalid Argument, try: '!help'.**").then(msg => {msg.delete(4000)});
				return;
			}
			else if (args[0].toLowerCase() === 'blue' || args[0].toLowerCase() === 'cyan' || args[0].toLowerCase() === 'dark_green' || args[0].toLowerCase() === 'dark_red' || args[0].toLowerCase() === 'purple' || args[0].toLowerCase() === 'orange' || args[0].toLowerCase() === 'gray' || args[0].toLowerCase() === 'green' || args[0].toLowerCase() === 'aqua' || args[0].toLowerCase() === 'red' || args[0].toLowerCase() === 'pink' || args[0].toLowerCase() === 'yellow' || args[0].toLowerCase() === 'white' || args[0].toLowerCase() === 'none') {
				message.member.removeRole(message.guild.roles.find(r => r.name === "aqua"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "blue"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "cyan"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "dark_green"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "dark_red"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "purple"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "orange"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "gray"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "green"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "red"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "pink"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "yellow"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "white"));
				
				if (args[0].toLowerCase() === 'blue' || args[0].toLowerCase() === 'cyan' || args[0].toLowerCase() === 'dark_green' || args[0].toLowerCase() === 'dark_red' || args[0].toLowerCase() === 'purple' || args[0].toLowerCase() === 'orange' || args[0].toLowerCase() === 'gray' || args[0].toLowerCase() === 'green' || args[0].toLowerCase() === 'aqua' || args[0].toLowerCase() === 'red' || args[0].toLowerCase() === 'pink' || args[0].toLowerCase() === 'yellow' || args[0].toLowerCase() === 'white') {
					message.member.addRole(message.guild.roles.find(r => r.name.toLowerCase() == args[0].toLowerCase()));
					message.channel.send(":white_check_mark: Color asigned!").then(msg => {msg.delete(4000)});
				}
				message.delete();
			}
			else if (args[0].toLowerCase() === 'list') {
				message.channel.send("**Colors:**\n - Blue\n - Cyan\n - Dark_Green\n - Dark_Red\n - Purple\n - Orange\n - Gray\n - Green\n - Aqua\n - Red\n - Pink\n - Yellow\n - White\n - None").then(msg => {msg.delete(30000)});
				message.delete(30000);
			}
			else {
				message.delete();
				message.channel.send(":no_entry: **Invalid Argument, try: '!help'.**").then(msg => {msg.delete(4000)});
			}
		}
		else if (command === 'tag') {
			if (!args[0]) {
				message.delete();
				message.channel.send(":no_entry: **Invalid Argument, try: '!help'.**").then(msg => {msg.delete(4000)});
				return;
			}
			else if (args[0].toLowerCase() === 'school' || args[0].toLowerCase() === 'skyblock' || args[0].toLowerCase() === 'wynncraft' || args[0].toLowerCase() === 'minigames' || args[0].toLowerCase() === 'uhc' || args[0].toLowerCase() === 'survival' || args[0].toLowerCase() === 'modded' || args[0].toLowerCase() === 'ark' || args[0].toLowerCase() === 'hypixel' || args[0].toLowerCase() === 'none') {
				message.member.removeRole(message.guild.roles.find(r => r.name === "school"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "skyblock"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "wynncraft"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "minigames"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "uhc"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "survival"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "modded"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "ark"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "hypixel"));
				
				if (args[0].toLowerCase() === 'school' || args[0].toLowerCase() === 'skyblock' || args[0].toLowerCase() === 'wynncraft' || args[0].toLowerCase() === 'minigames' || args[0].toLowerCase() === 'uhc' || args[0].toLowerCase() === 'survival' || args[0].toLowerCase() === 'modded' || args[0].toLowerCase() === 'ark' || args[0].toLowerCase() === 'hypixel') {
					message.member.addRole(message.guild.roles.find(r => r.name.toLowerCase() == args[0].toLowerCase()));
					message.channel.send(":white_check_mark: Tag asigned!").then(msg => {msg.delete(4000)});
				}
				else {
					message.channel.send(":white_check_mark: Tag removed!").then(msg => {msg.delete(4000)});
				}
				message.delete();
			}
			else if (args[0].toLowerCase() === 'list') {
				message.channel.send("**Tags:**\n - Skyblock\n - Wynncraft\n - Minigames\n - UHC\n - Survival\n - Modded\n - ARK\n - Hypixel\n - School\n - None").then(msg => {msg.delete(30000)});
				message.delete(30000);
			}
			else {
				message.delete();
				message.channel.send(":no_entry: **Invalid Argument, try: '!help'.**").then(msg => {msg.delete(4000)});
			}
		}
		else if (command === 'cf') {
			var cf = Array(2);
			cf[1] = "Heads";
			cf[2] = "Tails";
			
			var coinflip = getRandomInt(1, 3);
			if (coinflip === 1) { message.channel.send(cf[1]).then(msg => {msg.delete(300000)}); }
			if (coinflip === 2) { message.channel.send(cf[2]).then(msg => {msg.delete(300000)}); }
			message.delete(300000);
		}
		else if (command === 'notifications') {
			if (!message.member.roles.find(r => r.name.toLowerCase() === "notifications")) {
				message.member.addRole(message.guild.roles.find(r => r.name.toLowerCase() == "notifications"));
				message.channel.send(":white_check_mark: Notifications enabled!").then(msg => {msg.delete(4000)});
			}
			else {
				message.member.removeRole(message.guild.roles.find(r => r.name.toLowerCase() == "notifications"));
				message.channel.send(":white_check_mark: Notifications disabled!").then(msg => {msg.delete(4000)});
			}
			message.delete(4000);
		}
		else if (command === 'quickquestion' || command === 'qq') {
			var Amount = getRandomInt(2,5);
			var Form = getRandomInt(1,5);
			
			if (Form === 1 && Amount == 2) { message.channel.send('wat is: **' + getRandomInt(0,10) + ' x ' + getRandomInt(0,10) + '**=').then(msg => {msg.delete(30000)}); }
			if (Form === 1 && Amount == 3) { message.channel.send('wat is: **' + getRandomInt(0,10) + ' x ' + getRandomInt(0,10) + ' x ' + getRandomInt(0,10) + '**=').then(msg => {msg.delete(30000)}); }
			if (Form === 1 && Amount == 4) { message.channel.send('Wat is het kwadraat van: **' + getRandomInt(1, 16) + '**?').then(msg => {msg.delete(30000)}); }
			
			if (Form === 2 && Amount == 2) { message.channel.send('wat is: **' + getRandomInt(1,21) + ' + ' + getRandomInt(1,21) + '**=').then(msg => {msg.delete(30000)}); }
			if (Form === 2 && Amount == 3) { message.channel.send('wat is: **' + getRandomInt(1,21) + ' + ' + getRandomInt(1,21) + ' + ' + getRandomInt(1,21) + '**=').then(msg => {msg.delete(30000)}); }
			if (Form === 2 && Amount == 4) { message.channel.send('wat is: **' + getRandomInt(1,21) + ' + ' + getRandomInt(1,21) + ' + ' + getRandomInt(1,21) + ' + ' + getRandomInt(1,21) + '**=').then(msg => {msg.delete(30000)}); }
			
			if (Form === 3 && Amount == 2) { message.channel.send('wat is: **' + getRandomInt(18,50) + ' - ' + getRandomInt(1,10) + ' - ' + getRandomInt(1,10) + '**=').then(msg => {msg.delete(30000)}); }
			if (Form === 3 && Amount == 3) { message.channel.send('wat is: **' + getRandomInt(27,75) + ' - ' + getRandomInt(1,10) + ' - ' + getRandomInt(1,10) + ' - ' + getRandomInt(1,10) + '**=').then(msg => {msg.delete(30000)}); }
			if (Form === 3 && Amount == 4) { message.channel.send('wat is: **' + getRandomInt(36,100) + ' - ' + getRandomInt(1,10) + ' - ' + getRandomInt(1,10) + ' - ' + getRandomInt(1,10) + ' - ' + getRandomInt(1,10) + '**=').then(msg => {msg.delete(30000)}); }
			
			if (Form === 4 && Amount == 2) { message.channel.send('Wat is: **(' + getRandomInt(1,100) + ' + ' + getRandomInt(1,50) + ' - ' + getRandomInt(1,25) + ') x ' + getRandomInt(1,4) + '**=').then(msg => {msg.delete(30000)}); }
			if (Form === 4 && Amount == 3) { message.channel.send('Tag another user.').then(msg => {msg.delete(30000)}); }
			if (Form === 4 && Amount == 4) { message.channel.send('Tag yourself.').then(msg => {msg.delete(30000)}); }
			
			message.delete();
		}
		else if (command === 'privatecall' || command === 'pc') {
			const voiceChannel = message.member.voiceChannel;
			let privatechannels = ["667089585527980062", "672407468130959371", "672407491807543297", "672407504914743318", "672407514259914762", "672407536741122048", "672407548229320754", "672407558270746635", "672407597248151591", "672407607004364801"];

			if (voiceChannel && message.member.roles.find(r => r.name === "Moderator") || voiceChannel && message.member.roles.find(r => r.name === "Administrator")) {
				message.member.setVoiceChannel(privatechannels[getRandomInt(0,10)]);
				message.channel.send(":white_check_mark: User has been succesfully moved to a private channel.\n*You've to manually move users into this call!*").then(msg => {msg.delete(6000)});				
			}
			else if (!voiceChannel && message.member.roles.find(r => r.name === "Moderator") || !voiceChannel && message.member.roles.find(r => r.name === "Administrator")) {
				message.channel.send(":no_entry: User is not connected to a channel and thus can't be moved.").then(msg => {msg.delete(6000)});
			}
			else {
				message.channel.send(":no_entry: You do not have the permission to create a private call.\n*Please contact a Moderator if you need a private call*").then(msg => {msg.delete(6000)});
			}
			message.delete();
		}
		else {
			message.delete();
			message.channel.send(":no_entry: **Invalid Command, try: '!help'.**").then(msg => {msg.delete(4000)});
		}		
	}

	function getRandomInt(min, max) {
	 		min = Math.ceil(min);
	  		max = Math.floor(max);
	 		return Math.floor(Math.random() * (max - min)) + min;
	}
});

client.login(process.env.token);
