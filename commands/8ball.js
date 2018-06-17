const Discord = require("Discord.js");
var fortunes = [ 
    "Yes",
    "No",
    "Maybe",
    "There is a possibility!",
    "Nope, not in a million years!",
    "Affirmative!",
    "My sources inform me that the answer is no!",
    "Signs point to yes",
    "Don't bet on it!",
    "My reply is no",
    "Ask again later",
    "Without a doubt!",
    "Very doubtful",
    "It is certain",
    "Well that was a daft question, ask me something else please.",
    "Of course not!",
    "Impossible!",
    "Nothing is certain.",
    "Perhaps"
  ];

  module.exports.run = async (bot, message, args, talkedRecently) => {
    if (talkedRecently.has(message.author.id)) {
        message.delete();
        message.channel.send("Wait 5 seconds before using another command " + message.author).then(msg => {msg.delete(5000)});
    }
    else {

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 5000);

    //NOEMBED
    // if(args[0]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
    // else message.channel.send(message.author.toString() + " It helps if you actually ask a question!");

    //EMBEDED
    if(args[0]) {

    let bEmbed = new Discord.RichEmbed

    bEmbed
    .setAuthor("Chat Game!", bot.user.avatarURL)
    .setDescription("8Ball")
    .setThumbnail(message.author.avatarURL)
    .setColor("#4286f4")
    .addField("Question:", `${args.join(" ")}`)
    .addField("Result:", `${fortunes[Math.floor(Math.random() * fortunes.length)]}`)
    .setFooter(`Requested by: ${message.author.username} (${message.author.id})`);

    message.channel.send({embed: bEmbed});
    message.delete();

}
else message.channel.send(message.author.toString() + " It helps if you actually ask a question!");

}}

  module.exports.help = {
      name: "8ball",
      description: "A yes/no answer randomizer",
      usage: "8ball <question>"
  }