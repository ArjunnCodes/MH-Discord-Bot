const Discord = require("Discord.js");

module.exports.run = async (bot, message, args) => {
    
    await message.delete();
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 1 || deleteCount > 100)
      return message.channel.send("Please provide a number between 1 and 100 for the number of messages to delete.");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched);
}

module.exports.help = {
    name: "purge",
    description: "Mass delete messages",
    usage: "purge <1-100>",
    staffOnly: "true"
}