// Import the WebClient class from the @slack/web-api package
import { WebClient } from '@slack/web-api';

// Create an instance of WebClient with the Slack token from environment variables
const webClient = new WebClient(process.env.SLACK_TOKEN);

// Define the API route handler function
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      // Send the message to the specified Slack channel
      const result = await webClient.chat.postMessage({
        text: message,
        channel: process.env.CHANNEL_ID,
      });

      // Send a success response with the result object
      res.status(200).json({ message: 'Message sent successfully!', result });
    } catch (error) {
      // Handle errors and send a failure response
      console.error('Error sending message:', error);
      res.status(500).json({ message: 'Failed to send message.', error: error.message });
    }
  } else {
    // Respond with 405 if the request method is not POST
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: 'Method not allowed' });
  }
}
