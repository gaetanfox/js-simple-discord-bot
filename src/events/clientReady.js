const { REST, Routes } = require('discord.js')

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)

const { fetchForecast } = require('../requests/forecast')

async function clientReadyHandler(client) {
  console.log(`Logged in as ${client.user.tag}!`)
  try {
    console.log(`Started refreshing ${client.commands.length} commands!`)
    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: client.commands.map((commands) => commands.data.toJSON()),
      }
    )
    console.log(`Successfully reloaded ${data.length} commands!`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  clientReadyHandler,
}
