const { Client, GatewayIntentBits, Events, Collection } = require('discord.js')
require('dotenv').config()
const { clientReadyHandler } = require('./events/clientReady')
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
})
const pingCommand = require('./commands/ping')

client.commands = new Collection()
// Setting up the commands
client.commands.set(pingCommand.data.name, pingCommand)

// Less gooooo
client.on(Events.ClientReady, clientReadyHandler)
client.login(process.env.DISCORD_TOKEN)
