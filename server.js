import scheduleCommands from './src/commands/schedule.js'
import dotenv from 'dotenv'
import { Client, GatewayIntentBits, Routes, REST } from 'discord.js'
import schedule from 'node-schedule'

dotenv.config()

const TOKEN = process.env.DISCORD_BOT_TOKEN
const CLIENT_ID = process.env.DISCORD_CLIENT_ID
const ALERT_BOT_GUILD = process.env.DISCORD_ALERT_BOT_GUILD

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const rest = new REST({ version: '10' }).setToken(TOKEN)

client.on('ready', () => console.log('Bot is online'))

client.on('interactionCreate', (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'schedule') {
      // handle all the logic for schedule command
      const message = interaction.options.getString('message')
      const time = interaction.options.getInteger('time')
      const channel = interaction.options.getChannel('channel')

      const date = new Date(new Date().getTime() + time)
      interaction.reply({
        content: `Your message has been scheduled for ${date.toTimeString()} `,
      })
      console.log('date :>> ', date)
      schedule.scheduleJob(date, () => {
        channel.send({ content: message })
      })
    }
  }
})

async function main() {
  try {
    console.log('Started refreshing application (/) commands.')
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, ALERT_BOT_GUILD),
      {
        body: [scheduleCommands],
      },
    )
    client.login(TOKEN)
    console.log('Successfully reloaded application (/) commands.')
  } catch (err) {
    console.log('err :>> ', err)
  }
}

// parseRss()
main()
