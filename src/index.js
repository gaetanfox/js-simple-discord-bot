const { Client, GatewayIntentBits, Events, Collection } = require('discord.js')
require('dotenv').config()
const { clientReadyHandler } = require('./events/clientReady')
const { interactionCreateHandler } = require('./events/interactionCreate')

const pingCommand = require('./commands/ping')
const forecastCommand = require('./commands/forecast')
const weatherCommand = require('./commands/currentWeather')
const astroCommand = require('./commands/astro')

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
})

client.commands = new Collection()
// Setting up the commands
client.commands.set(pingCommand.data.name, pingCommand)
client.commands.set(forecastCommand.data.name, forecastCommand)
client.commands.set(weatherCommand.data.name, weatherCommand)
client.commands.set(astroCommand.data.name, astroCommand)

// Less gooooo (nly once as it is only for the login)
client.once(Events.ClientReady, clientReadyHandler)

// little dude needs to be able to reply
client.on(Events.InteractionCreate, interactionCreateHandler)

// login
client.login(process.env.DISCORD_TOKEN)
