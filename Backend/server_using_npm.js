import OpenAI from 'openai';
import 'dotenv/config';

const client = new OpenAI({
//   apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
    apiKey: process.env.OPENAI_API_KEY,
});

const response = await client.responses.create({
  model: 'gpt-4o-mini',
  instructions: 'You are a coding assistant that talks like a pirate',
  input: 'What a 23 year old computer engineer student can do ?',
});

console.log(response.output_text);