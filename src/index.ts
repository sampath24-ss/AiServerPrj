import {Hono} from 'hono';
import { Ai } from '@cloudflare/ai';



const app = new Hono<{Bindings: Env}>();

app.get('/', async c => {
	const ai = new Ai(c.env.AI);
	const content = c.req.query('query') || 'What is the origin of the phrase Hello,World'

	const messages = [
		{ role: "system", content: "You are a friendly assistant" },
		{
		  role: "user",
		 content
		},
	  ];

	  const inputs = {messages}

	 const res =  await ai.run('@cf/mistral/mistral-7b-instruct-v0.1', inputs)
	return c.html(`${JSON.stringify(res)}`);
})


export default app
