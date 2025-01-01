import dotenv from "dotenv";
import { Client, GatewayIntentBits, PermissionsBitField } from "discord.js";
import { handleMessage } from "./controllers/botController.js";
import { startGemini } from "./services/genaiService.js";
// Load Environment Variables from .env file
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Start GenAI Model to Process User Queries
const model = startGemini();

client.on("messageCreate", (message) => {
  // Restricting Bot to Reply to its own text
  if (
    message.guild.members.me
      .permissionsIn(message.channel)
      .has(PermissionsBitField.Flags.SendMessages)
  ) {
    if (message.author.bot) {
      return;
    }

    // Reply to Users Message
    handleMessage(message, model);
  }
});

// Authenticate Discord Bot
client.login(process.env.DISCORD_TOKEN);
