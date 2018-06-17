const Discord = require("Discord.js");
module.exports.run = async (bot, message, args, talkedRecently) => {
	message.delete();
    if (talkedRecently.has(message.author.id)) {
        message.channel.send("Wait 5 seconds before using another command " + message.author).then(msg => {
            msg.delete(5000);
        });
    }
    else {

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 5000);
    
    let sEmbed = new Discord.RichEmbed

    sEmbed
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setThumbnail(bot.user.avatarURL)
    .setColor("#4286f4")
    .addField("Staff Support", `If you require staff help, please use #staff-assistance. Alternatively, you can submit a support ticket on the forums.`)
    .addField("Website:", 'https://www.mineheroes.net/support/')
    .setFooter(`Requested by: ${message.author.username} (${message.author.id})`);

    message.channel.send({embed: sEmbed})

}   

}

module.exports.help = {
    name: "staff",
    description: "Informs the user of how to contact online staff.",
    usage: "staff",
    staffOnly: "false"
}