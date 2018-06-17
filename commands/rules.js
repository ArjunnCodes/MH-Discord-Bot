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
    let rEmbed = new Discord.RichEmbed

    rEmbed
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setThumbnail(bot.user.avatarURL)
    .setColor("#4286f4")
    .addField("Rules:", `For a list of the server and discord rules, please check the server website.`)
    .addField("Website:", 'https://www.mineheroes.net/wiki/rules/')
    .setFooter(`Requested by: ${message.author.username} (${message.author.id})`);

    message.channel.send({embed: rEmbed})
}
}

module.exports.help = {
    name: "rules",
    description: "Displays the server rules.",
    usage: "rules",
    staffOnly: "false"
}
