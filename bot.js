const Discord = require('discord.js');
const { prefix } = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
	console.log('HSB responded.');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) {
		if (!message.author.bot) { 
			message.delete();
			message.channel.send("Invalid Command!").then(msg => {msg.delete(3000)}); 
		}
		return;
	}

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'help') {
		message.channel.send('!help\n!bot\n!stats [player]\n!reforge\n!color [color/list]').then(msg => {msg.delete(300000)});
		message.delete(300000);
	}
	else if (command === 'stats') {
		message.channel.send(`https://sky.lea.moe/stats/${args}`).then(msg => {msg.delete(300000)});
		message.delete(300000);
	}
	else if (command === 'bot') {
		const BotEmbed = new Discord.RichEmbed()
			.setColor('#252525')
			.setTitle('MineCraft / ARK')
			.setDescription("MineCraft / ARK Discord Bot\nType: '!help' to get started")
			.attachFiles(['assets/bot.png'])
			.setFooter('Made by Leon#1250')
			.setThumbnail('attachment://bot.png')
		message.channel.send(BotEmbed).then(msg => {msg.delete(300000)});
		message.delete(300000);
	}
	else if (command === 'reforge') {
		message.channel.send("**Damage:**\nArmor: Godly\nSword: Spicy\nLegendary/Epic talisman: Godly\nRare talisman: Itchy\nUncommon/Common talisman (*80%< crit chance*): Itchy\nUncommon/Common talisman (*80%>crit chance*): Godly/Zealous\n\n**HP&Defence:**\nArmor: Titanic\nSword: -\nTalisman: Ominous\n\n**Mana:**\nArmor: Wise\nSword: Legendary\nTalisman:Bizarre/Pretty").then(msg => {msg.delete(900000)});
		message.delete(300000);
	}
	else if (command === 'color') {
		if (args[0].toLowerCase() === 'blue' || args[0].toLowerCase() === 'purple' || args[0].toLowerCase() === 'orange' || args[0].toLowerCase() === 'gray' || args[0].toLowerCase() === 'green' || args[0].toLowerCase() === 'aqua' || args[0].toLowerCase() === 'red' || args[0].toLowerCase() === 'pink' || args[0].toLowerCase() === 'yellow' || args[0].toLowerCase() === 'white' || args[0].toLowerCase() === 'none') {
			message.member.removeRole(message.guild.roles.find(r => r.name === "blue"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "purple"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "orange"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "gray"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "green"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "aqua"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "red"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "pink"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "yellow"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "white"));
			
			if (args[0].toLowerCase() === 'blue' || args[0].toLowerCase() === 'purple' || args[0].toLowerCase() === 'orange' || args[0].toLowerCase() === 'gray' || args[0].toLowerCase() === 'green' || args[0].toLowerCase() === 'aqua' || args[0].toLowerCase() === 'red' || args[0].toLowerCase() === 'pink' || args[0].toLowerCase() === 'yellow' || args[0].toLowerCase() === 'white') {
				message.member.addRole(message.guild.roles.find(r => r.name.toLowerCase() == args[0].toLowerCase()));
				message.channel.send(":white_check_mark: Color asigned.").then(msg => {msg.delete(3000)});
			}
			message.delete(3000);
		}
		if (args[0].toLowerCase() === 'list') {
			message.channel.send("**Colors:**\n - Blue\n - Purple\n - Orange\n - Gray\n - Green\n - Aqua\n - Red\n - Pink\n - Yellow\n - White\n - None").then(msg => {msg.delete(300000)});
			message.delete(300000);
		}
	}
	else {
		message.delete();
		message.channel.send("Invalid Command!").then(msg => {msg.delete(3000)});
	}
});

client.login(process.env.token);
