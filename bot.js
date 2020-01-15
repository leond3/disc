const Discord = require('discord.js');
const { prefix } = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
	console.log('HSB responded.');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'help') {
		message.channel.send('!help\n!bot\n!stats [player]\n!reforge');
	}
	if (command === 'stats') {
		message.channel.send(`https://sky.lea.moe/stats/${args}`);
	}
	if (command === 'bot') {
		const BotEmbed = new Discord.RichEmbed()
			.setColor('#252525')
			.setTitle('Hypixel Skyblock Bot')
			.setDescription("Hypixel Skyblock Bot\nType: '!help' to get started")
			.attachFiles(['assets/profile.jpg'])
			.setFooter('Made by Leon#1250', 'attachment://profile.jpg')
			.setThumbnail('http://pm1.narvii.com/6527/1df18b462cbaa988114a20270672d461ecd508ab_hq.jpg')
		message.channel.send(BotEmbed);
	}
	if (command === 'reforge') {
	message.channel.send("**Damage:**\nArmor: Godly\nSword: Spicy\nLegendary/Epic talisman: Godly\nRare talisman: Itchy\nUncommon/Common talisman (*80%< crit chance*): Itchy\nUncommon/Common talisman (*80%>crit chance*): Godly/Zealous\n\n**HP&Defence:**\nArmor: Titanic\nSword: -\nTalisman: Ominous\n\n**Mana:**\nArmor: Wise\nSword: Legendary\nTalisman:Bizarre/Pretty");
	}
	if (command === 'color') {
		message.member.removeRole(message.guild.roles.find(r => r.name === "green"));
		if (args[0].toLowerCase() === 'blue' || args[0].toLowerCase() === 'purple' || args[0].toLowerCase() === 'orange' || args[0].toLowerCase() === 'gray' || args[0].toLowerCase() === 'green' || args[0].toLowerCase() === 'aqua' || args[0].toLowerCase() === 'red' || args[0].toLowerCase() === 'pink' || args[0].toLowerCase() === 'yellow' || args[0].toLowerCase() === 'white') {
			message.member.addRole(message.guild.roles.find(r => r.name.toLowerCase() == args[0].toLowerCase()));
			message.delete(1000);
		}
	}
});

client.login(process.env.token);
