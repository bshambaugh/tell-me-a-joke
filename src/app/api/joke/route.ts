import { Configuration, OpenAIApi } from 'openai-edge';

// Create an OpenAI API client (that's edge-friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set response time limit
export const maxDuration = 30;

// IMPORTANT: Set the runtime to edge for streaming responses
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages, parameters } = await req.json();
    const { topic, tone, jokeType, temperature } = parameters;

    const prompt = `Generate a ${tone} ${jokeType} joke about ${topic}. Make it funny and engaging.`;

    const response = await openai.createChatCompletion({
      model: 'gpt-4o',
      stream: true,
      messages: [
        {
          role: 'system',
          content: 'You are a professional comedian specialized in generating funny and engaging jokes.'
        },
        ...messages,
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: temperature,
    });

    // Return the response with streaming headers
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'There was an error generating your joke' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
} 